import { Container } from 'inversify';
import {
  DefaultOfferService,
  // OfferController,
  OfferEntity,
  OfferModel,
  OfferService,
} from './index.js';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import {
  OfferSummaryEntity,
  OfferSummaryModel,
} from './offerSummary.entity.js';
import { Controller } from '../../libs/rest/index.js';
import OfferController from './offer.controller.js';
import { FavoriteEntity, FavoriteModel } from '../favorite/index.js';

export function createOfferContainer(container: Container) {
  container.bind<OfferService>(Component.OfferService).to(DefaultOfferService);
  container
    .bind<types.ModelType<OfferEntity>>(Component.OfferModel)
    .toConstantValue(OfferModel);
  container
    .bind<types.ModelType<OfferSummaryEntity>>(Component.OfferSummaryModel)
    .toConstantValue(OfferSummaryModel);
  container
    .bind<types.ModelType<FavoriteEntity>>(Component.FavoriteModel)
    .toConstantValue(FavoriteModel);
  container
    .bind<Controller>(Component.OfferController)
    .to(OfferController)
    .inSingletonScope();
}
