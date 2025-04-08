import { Container } from 'inversify';
import { Application } from './rest/rest.application.js';
import { RestConfig } from './rest/rest.config.js';
import { PinoLogger } from './shared/libs/logger/pino.logger.js';
import { Component } from './shared/types/component.enum.js';
import { Logger } from './shared/libs/logger/index.js';
import { RestSchema } from './shared/libs/config/rest.schema.js';
import { Config } from './shared/libs/config/index.js';
import 'reflect-metadata';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from './shared/libs/database-client/index.js';

async function bootstrap() {
  const container = new Container();
  container
    .bind<Application>(Component.Application)
    .to(Application)
    .inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container
    .bind<Config<RestSchema>>(Component.Config)
    .to(RestConfig)
    .inSingletonScope();
  container
    .bind<DatabaseClient>(Component.DatabaseClient)
    .to(MongoDatabaseClient)
    .inSingletonScope();

  const application = container.get<Application>(Component.Application);
  await application.init();
}

bootstrap();
