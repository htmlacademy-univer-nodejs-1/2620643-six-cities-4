import { Request } from 'express';
import { RequestParams } from '../../../libs/rest/types/request.params.type.js';
import { RequestBody } from '../../../libs/rest/types/request-body.type.js';
import { CreateOfferDto } from '../index.js';

export type CreateOfferRequest = Request<
  RequestParams,
  RequestBody,
  CreateOfferDto
>;
