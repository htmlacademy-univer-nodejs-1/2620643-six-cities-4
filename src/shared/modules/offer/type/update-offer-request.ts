import { Request } from 'express';
import { RequestBody } from '../../../libs/rest/types/request-body.type.js';
import { UpdateOfferDto } from '../dto/update-offer.dto.js';
import { ParamOfferId } from './param-offerid.type.js';

export type UpdateOfferRequest = Request<
  ParamOfferId,
  RequestBody,
  UpdateOfferDto
>;
