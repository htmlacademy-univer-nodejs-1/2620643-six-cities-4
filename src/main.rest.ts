import { Container } from 'inversify';
import { Application } from './rest/rest.application.js';
import { Component } from './shared/types/component.enum.js';
import 'reflect-metadata';
import { createOfferContainer } from './shared/modules/offer/index.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createCommentContainer } from './shared/modules/comment/index.js';

async function bootstrap() {
  const container = new Container();

  createRestApplicationContainer(container);
  createUserContainer(container);
  createOfferContainer(container);
  createCommentContainer(container);

  const application = container.get<Application>(Component.Application);
  await application.init();
}

bootstrap();
