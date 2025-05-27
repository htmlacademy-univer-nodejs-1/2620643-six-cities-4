import { ParamsDictionary } from 'express-serve-static-core';
import { TownType } from '../../../types/town-type.enum.js';

export type ParamTown = {
  town: TownType;
} & ParamsDictionary;
