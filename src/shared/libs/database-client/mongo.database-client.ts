import { inject, injectable } from 'inversify';
import { DatabaseClient } from './database-client.interface.js';
import * as Mongoose from 'mongoose';
import { Component } from '../../types/component.enum.js';
import { Logger } from 'pino';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof Mongoose | undefined;
  private isConnected: boolean;

  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    this.isConnected = false;
  }

  public isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect({
    uri,
    params,
  }: {
    uri: string;
    params: {
      authSource: string;
      user: string;
      pass: string;
    };
  }): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB…');

    this.mongoose = await Mongoose.connect(uri, params);
    this.isConnected = true;

    this.logger.info('Database connection established.');
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase()) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose?.disconnect?.();
    this.isConnected = false;
    this.logger.info('Database connection closed.');
  }
}
