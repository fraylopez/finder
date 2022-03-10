import { injectable } from "inversify";
import { MongoClient } from 'mongodb';
import { MongoConfig } from "./MongoConfig";

@injectable()
export class MongoClientFactory {
  private clients: { [key: string]: MongoClient; } = {};

  async getClient(contextName: string, config: MongoConfig): Promise<MongoClient> {
    let client = this.clients[contextName];

    if (!client) {
      client = await this.createAndConnectClient(config);
      this.registerClient(client, contextName);
    }

    return client;
  }

  private async createAndConnectClient(config: MongoConfig): Promise<MongoClient> {
    const client = new MongoClient(
      config.url, {
      ignoreUndefined: true,
      serverSelectionTimeoutMS: config.connectionTimeoutMs,
    });
    await client.connect();
    return client;
  }

  private registerClient(client: MongoClient, contextName: string): void {
    this.clients[contextName] = client;
  }
}

