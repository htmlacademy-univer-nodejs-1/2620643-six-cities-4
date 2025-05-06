import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferEntity } from './offer.entity.js';
import { types } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferSummaryEntity } from './offerSummary.entity.js';
import { DEFAULT_OFFER_MAX_LIMIT } from './offer.constant.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { TownType } from '../../types/town-type.enum.js';
import { FavoriteEntity } from '../favorite/index.js';
import { CommentEntity } from '../comment/comment.entity.js';

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

  public async find(
    userId: string,
    count?: number
  ): Promise<types.DocumentType<OfferSummaryEntity>[]> {
    const limit =
      count && count > DEFAULT_OFFER_MAX_LIMIT
        ? DEFAULT_OFFER_MAX_LIMIT
        : count;

    const offers = await this.offerSummaryModel
      .find()
      .limit(limit ?? DEFAULT_OFFER_MAX_LIMIT)
      .exec();

    return this.withFavorites(offers, userId);
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
    userId: string
  ): Promise<
    (types.DocumentType<OfferEntity> & { isFavorite: boolean }) | null
  > {
    const offer = await this.offerModel.findById(offerId).exec();

    if (!offer) {
      return null;
    }

    const isFavorite = await this.favoriteModel
      .findOne({ userId, offerId })
      .exec();

    offer.isFavorite = Boolean(isFavorite);

    return offer;
  }

  public async updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .exec();
  }

  public async deleteById(
    offerId: string
  ): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async findPremOffersByTown(
    userId: string,
    town: TownType
  ): Promise<types.DocumentType<OfferSummaryEntity>[]> {
    const offers = await this.offerSummaryModel.find({ town }).exec();

    return this.withFavorites(offers, userId);
  }

  public async getUserFavorites(
    userId: string
  ): Promise<types.DocumentType<OfferSummaryEntity>[]> {
    const favorites = await this.favoriteModel.find({ userId }).exec();
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

    if (!existing) {
      await this.favoriteModel.create({ userId, offerId });
    }

    const offer = await this.offerSummaryModel.findById(offerId).exec();

    if (!offer) {
      throw new Error('Offer not found');
    }

    offer.isFavorite = true;

    return offer;
  }

  public async deleteFavorite(userId: string, offerId: string): Promise<void> {
    await this.favoriteModel.deleteOne({ userId, offerId });
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
    const offerIds = new Set(favorites.map((f) => f.offerId.toString()));

    return offers.map((offer) => ({
      ...offer,
      isFavorite: offerIds.has(offer.id.toString()),
    }));
  }
}
