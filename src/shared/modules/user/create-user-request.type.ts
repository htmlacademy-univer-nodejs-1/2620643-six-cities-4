import { Request } from 'express';
import { RequestParams } from '../../libs/rest/types/request.params.type.js';
import { RequestBody } from '../../libs/rest/types/request-body.type.js';
import { CreateUserDto } from './dto/create-user.dto.js';

export type CreateUserRequest = Request<
  RequestParams,
  RequestBody,
  CreateUserDto
>;
