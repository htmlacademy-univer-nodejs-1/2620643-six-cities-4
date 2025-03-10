import { config } from 'dotenv';
import { Config } from '../shared/libs/config/config.interface.js';
import { Logger } from '../shared/libs/logger/logger.interface.js';
import {
  configRestSchema,
  RestSchema,
} from '../shared/libs/config/rest.schema.js';
import { inject, injectable } from 'inversify';
import { Component } from '../shared/types/component.enum.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('impossible read .env file');
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file fould and successfully parse!');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
