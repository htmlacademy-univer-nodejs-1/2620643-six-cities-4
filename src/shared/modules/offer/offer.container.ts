import { Container } from 'inversify';
import {
  DefaultOfferService,
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

export function createOfferContainer(container: Container) {
  container.bind<OfferService>(Component.OfferService).to(DefaultOfferService);
  container
    .bind<types.ModelType<OfferEntity>>(Component.OfferModel)
    .toConstantValue(OfferModel);
  container
    .bind<types.ModelType<OfferSummaryEntity>>(Component.OfferSummaryModel)
    .toConstantValue(OfferSummaryModel);
}
