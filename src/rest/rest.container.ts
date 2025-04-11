import { Container } from 'inversify';
import { Application } from './rest.application.js';
import { Component } from '../shared/types/component.enum.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { RestConfig } from './rest.config.js';
import { DatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import { MongoDatabaseClient } from '../shared/libs/database-client/mongo.database-client.js';
import { Logger, PinoLogger } from '../shared/libs/logger/index.js';
import { Config } from '../shared/libs/config/index.js';

export function createRestApplicationContainer(container: Container) {
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
}
