import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferEntity } from './offer.entity.js';
import { types } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferSummaryEntity } from './offerSummary.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { TownType } from '../../types/town-type.enum.js';
import { FavoriteEntity } from '../favorite/index.js';
import { CommentEntity } from '../comment/comment.entity.js';
import { DEFAULT_PREMIUM_BY_TOWN_MAX_LIMIT } from './offer.constant.js';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../../libs/rest/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.OfferSummaryModel)
    private readonly offerSummaryModel: types.ModelType<OfferSummaryEntity>,
    @inject(Component.FavoriteModel)
    private readonly favoriteModel: types.ModelType<FavoriteEntity>,
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }

  public async find(
    count: number,
    userId?: string
  ): Promise<OfferSummaryEntity[]> {
    const offers = await this.offerSummaryModel
      .find()
      .sort({ date: -1 })
      .limit(count)
      .lean<OfferSummaryEntity[]>()
      .exec();

    const normalizedOffers = offers.map((offer) => ({
      ...offer,
      id: offer._id.toString(),
    }));

    if (userId) {
      return this.withFavorites(normalizedOffers, userId);
    }

    return normalizedOffers;
  }

  public async create(
    dto: CreateOfferDto
  ): Promise<types.DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(
    offerId: string,
    userId: string | null
  ): Promise<
    (types.DocumentType<OfferEntity> & { isFavorite: boolean }) | null
  > {
    const offer = await this.offerModel.findById(offerId).exec();

    if (userId) {
      const isFavorite = await this.favoriteModel
        .findOne({ userId, offerId })
        .exec();

      offer!.isFavorite = Boolean(isFavorite);
    }

    return offer;
  }

  public async updateById(
    offerId: string,
    dto: UpdateOfferDto,
    userId: string
  ): Promise<types.DocumentType<OfferEntity> | null> {
    const existingOffer = await this.offerModel.findById(offerId).exec();

    if (existingOffer!.userId.toString() !== userId) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        'You are not the author',
        'OfferController'
      );
    }

    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .exec();
  }

  public async deleteById(
    offerId: string,
    userId: string
  ): Promise<types.DocumentType<OfferEntity> | null> {
    const existingOffer = await this.offerModel.findById(offerId).exec();

    if (existingOffer!.userId.toString() !== userId) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        'You are not the author',
        'OfferController'
      );
    }

    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async findPremOffersByTown(
    userId: string | null,
    town: TownType
  ): Promise<OfferSummaryEntity[]> {
    const offers = await this.offerSummaryModel
      .find({ town, isPremium: true })
      .limit(DEFAULT_PREMIUM_BY_TOWN_MAX_LIMIT)
      .sort({ date: -1 })
      .lean<OfferSummaryEntity[]>()
      .exec();

    const normalizedOffers = offers.map((offer) => ({
      ...offer,
      id: offer._id.toString(),
    }));

    if (userId) {
      return this.withFavorites(normalizedOffers, userId);
    }
    return normalizedOffers;
  }

  public async getUserFavorites(
    userId: string
  ): Promise<types.DocumentType<OfferSummaryEntity>[]> {
    const favorites = await this.favoriteModel.find({ userId }).exec();

    if (favorites.length === 0) {
      return [];
    }

    const offerIds = favorites.map((fav) => fav.offerId);

    return this.offerSummaryModel.find({ _id: { $in: offerIds } }).exec();
  }

  public async addFavorite(
    userId: string,
    offerId: string
  ): Promise<types.DocumentType<OfferSummaryEntity>> {
    const existing = await this.favoriteModel
      .findOne({ userId, offerId })
      .exec();

    if (existing) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        'This offer has been already added to favorite',
        'OfferController'
      );
    }

    await this.favoriteModel.create({ userId, offerId });

    const offer = await this.offerSummaryModel.findById(offerId).exec();

    offer!.isFavorite = true;

    return offer!;
  }

  public async deleteFavorite(
    userId: string,
    offerId: string
  ): Promise<boolean> {
    const result = await this.favoriteModel
      .deleteOne({ userId, offerId })
      .exec();

    return result.deletedCount === 1;
  }

  public async incCommentCount(
    offerId: string
  ): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        $inc: {
          commentCount: 1,
        },
      })
      .exec();
  }

  public async updateRating(
    offerId: string
  ): Promise<types.DocumentType<OfferEntity> | null> {
    const comments = await this.commentModel.find({ offerId }).exec();

    const ratings = comments.map((comment) => comment.rating);
    const total = ratings.reduce((acc, cur) => (acc += cur), 0);
    const avgRating = ratings.length > 0 ? total / ratings.length : 0;

    return this.offerModel
      .findByIdAndUpdate(offerId, { rating: avgRating }, { new: true })
      .exec();
  }

  private async withFavorites<T extends { id: string; isFavorite: boolean }>(
    offers: T[],
    userId: string
  ): Promise<T[]> {
    const favorites = await this.favoriteModel
      .find({ userId })
      .lean<{ offerId: string }[]>()
      .exec();
    const offerIds = new Set(favorites.map((f) => f.offerId));

    return offers.map((offer) => ({
      ...offer,
      isFavorite: offerIds.has(offer.id.toString()),
    }));
  }
}
