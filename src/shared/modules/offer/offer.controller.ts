import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.enum.js';
import {
  BaseController,
  DocumentExistsMiddleware,
  HttpMethod,
  PrivateRouteMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import {
  CreateOfferDto,
  OfferRdo,
  OfferService,
  OfferSummaryRdo,
} from './index.js';
import { fillDTO, getCoordinatesByTown } from '../../helpers/index.js';
import { CreateOfferRequest } from './type/create-offer-request.type.js';
import { UpdateOfferRequest } from './type/update-offer-request.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { ParamsDictionary } from 'express-serve-static-core';
import { QueryCount } from './type/query-count.type.js';
import { CommentRdo, CommentService } from '../comment/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { ParamTown } from './type/param-town.type.js';

@injectable()
export default class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService)
    private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.getAllOffers,
    });

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.createOffer,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto),
      ],
    });

    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavoriteOffers,
      middlewares: [new PrivateRouteMiddleware()],
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getOfferById,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: (req, res, _next) =>
        this.updateOffer(req as Request<ParamOfferId>, res),
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: (req, res, _next) =>
        this.deleteOffer(req as Request<ParamOfferId>, res),
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:town/premium',
      method: HttpMethod.Get,
      handler: (req, res, _next) =>
        this.getPremiumOffersByTown(req as Request<ParamTown>, res),
    });

    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Post,
      handler: (req, res, _next) =>
        this.addToFavourites(req as Request<ParamOfferId>, res),
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Delete,
      handler: (req, res, _next) =>
        this.removeFromFavourites(req as Request<ParamOfferId>, res),
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: (req, res, _next) =>
        this.getComments(req as Request<ParamOfferId>, res),
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
  }

  public async getAllOffers(
    {
      query,
      tokenPayload,
    }: Request<ParamsDictionary, unknown, unknown, QueryCount>,
    res: Response
  ): Promise<void> {
    const count = query.count ? parseInt(query.count, 10) : 60;

    const userId = tokenPayload ? tokenPayload.id : undefined;

    const offers = await this.offerService.find(count, userId);

    this.ok(res, fillDTO(OfferSummaryRdo, offers));
  }

  public async createOffer(
    { body, tokenPayload }: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create({
      ...body,
      userId: tokenPayload.id,
      commentCount: 0,
      coordinates: getCoordinatesByTown(body.town),
    });
    const offer = await this.offerService.findById(
      result.id,
      result.userId.toString()
    );

    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async getOfferById(
    { params, tokenPayload }: Request,
    res: Response
  ): Promise<void> {
    const userId = tokenPayload ? tokenPayload.id.toString() : null;
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId, userId);

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async updateOffer(
    { params, body, tokenPayload }: UpdateOfferRequest,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(
      params.offerId,
      body,
      tokenPayload.id
    );

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async deleteOffer(
    { params, tokenPayload }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const deletedOffer = await this.offerService.deleteById(
      params.offerId,
      tokenPayload.id
    );

    await this.commentService.deleteByOfferId(params.offerId);

    this.ok(res, fillDTO(OfferRdo, deletedOffer));
  }

  public async getPremiumOffersByTown(
    { params, tokenPayload }: Request<ParamTown>,
    res: Response
  ): Promise<void> {
    const userId = tokenPayload ? tokenPayload.id.toString() : null;
    const { town } = params;
    const offers = await this.offerService.findPremOffersByTown(userId, town);

    this.ok(res, fillDTO(OfferSummaryRdo, offers));
  }

  public async getFavoriteOffers(
    { tokenPayload }: Request,
    res: Response
  ): Promise<void> {
    const offers = await this.offerService.getUserFavorites(tokenPayload.id);

    this.ok(res, fillDTO(OfferSummaryRdo, offers));
  }

  public async addToFavourites(
    { params, tokenPayload }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const offer = await this.offerService.addFavorite(
      tokenPayload.id,
      params.offerId
    );

    this.ok(res, fillDTO(OfferSummaryRdo, offer));
  }

  public async removeFromFavourites(
    { params, tokenPayload }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const isDeleted = await this.offerService.deleteFavorite(
      tokenPayload.id,
      params.offerId
    );

    this.ok(res, isDeleted === true);
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response) {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
