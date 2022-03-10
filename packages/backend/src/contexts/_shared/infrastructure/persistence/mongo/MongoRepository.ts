import { inject, injectable } from "inversify";
import { MongoClient } from "mongodb";
import { AggregateRoot } from '../../../domain/AggregateRoot';
import { MongoClientFactory } from "./MongoClientFactory";
import { MongoConfig } from "./MongoConfig";

@injectable()
export abstract class MongoRepository<T extends AggregateRoot> {
  constructor(
    @inject(MongoClientFactory) private clientFactory: MongoClientFactory,
  ) { }

  protected abstract moduleName(): string;
  protected abstract config(): MongoConfig;

  protected async collection() {
    return (await this.client()).db().collection(this.moduleName());
  }

  protected client(): Promise<MongoClient> {
    return this.clientFactory.getClient(this.moduleName(), this.config());
  }

  protected async findOne<T extends { _id: string; } = any>(id: string): Promise<T | null> {
    const collection = await this.collection();
    return await collection.findOne({ _id: id }) as T | null;
  }
  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const document = { ...aggregateRoot.toPrimitives(), _id: id, id: undefined };
    const collection = await this.collection();
    await collection.updateOne({ _id: id }, { $set: document }, { upsert: true });
  }
}
