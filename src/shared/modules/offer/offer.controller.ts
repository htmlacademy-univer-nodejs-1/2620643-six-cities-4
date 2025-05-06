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

@injectable()
export default class OfferController extends BaseController {
  constructor(@inject(Component.Logger) logger: Logger) {
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

  public async getAllOffers(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
  }

  public async createOffer(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
  }

  public async getOfferById(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
  }

  public async updateOffer(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
  }

  public async deleteOffer(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
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
