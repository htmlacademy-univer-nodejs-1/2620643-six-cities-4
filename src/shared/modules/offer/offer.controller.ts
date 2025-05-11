import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.enum.js';
import {
  BaseController,
  HttpError,
  HttpMethod,
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { OfferRdo, OfferService, OfferSummaryRdo } from './index.js';
import { fillDTO } from '../../helpers/index.js';
import { CreateOfferRequest } from './type/create-offer-request.type.js';
import { UpdateOfferRequest } from './type/update-offer-request.js';

@injectable()
export default class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
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
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getOfferById,
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.updateOffer,
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteOffer,
    });

    this.addRoute({
      path: '/:town/premium',
      method: HttpMethod.Get,
      handler: this.getPremiumOffersByTown,
    });

    this.addRoute({
      path: '/favourites',
      method: HttpMethod.Get,
      handler: this.getFavouriteOffers,
    });

    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Post,
      handler: this.addToFavourites,
    });

    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Delete,
      handler: this.removeFromFavourites,
    });
  }

  public async getAllOffers(
    { query }: Request<{ count?: string }>,
    res: Response
  ): Promise<void> {
    const count = query.count ? parseInt(query.count as string, 10) : 10;
    const offers = await this.offerService.find(count);

    this.ok(res, fillDTO(OfferSummaryRdo, offers));
  }

  public async createOffer(
    { body }: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(
      result.id,
      result.userId.toString()
    );

    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async getOfferById(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
  }

  public async updateOffer(
    { params, body }: UpdateOfferRequest,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(
      params.offerId as string,
      body
    );

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async deleteOffer({ params }: Request, res: Response): Promise<void> {
    const deletedOffer = await this.offerService.deleteById(
      params.offerId as string
    );

    this.ok(res, fillDTO(OfferRdo, deletedOffer));
  }

  public async getPremiumOffersByTown(
    _req: Request,
    _res: Response
  ): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
  }

  public async getFavouriteOffers(
    _req: Request,
    _res: Response
  ): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
  }

  public async addToFavourites(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
  }

  public async removeFromFavourites(
    _req: Request,
    _res: Response
  ): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
  }
}
