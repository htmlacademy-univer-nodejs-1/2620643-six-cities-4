import { Container } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { UserService } from './user-service.interface.js';
import { DefaultUserService } from './default-user.service.js';
import { UserEntity, UserModel } from './user.entity.js';
import { types } from '@typegoose/typegoose';
import { Controller } from '../../libs/rest/index.js';
import { UserController } from './user.controller.js';

export function createUserContainer(container: Container) {
  container
    .bind<UserService>(Component.UserService)
    .to(DefaultUserService)
    .inSingletonScope();
  container
    .bind<types.ModelType<UserEntity>>(Component.UserModel)
    .toConstantValue(UserModel);
  container
    .bind<Controller>(Component.UserController)
    .to(UserController)
    .inSingletonScope();
}
