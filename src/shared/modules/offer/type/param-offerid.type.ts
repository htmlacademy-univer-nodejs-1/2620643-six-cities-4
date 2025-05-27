import { ParamsDictionary } from 'express-serve-static-core';

export type ParamOfferId = ParamsDictionary & {
  offerId: string;
};
