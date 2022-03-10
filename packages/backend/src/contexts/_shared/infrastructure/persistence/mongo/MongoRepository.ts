import { inject, injectable } from "inversify";
import { MongoClient } from "mongodb";
import { AggregateRoot } from '../../../domain/AggregateRoot';
import { globalConfig } from "../../globalConfig";
import { MongoClientFactory } from "./MongoClientFactory";
import { MongoConfig } from "./MongoConfig";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface MongoRepository<TAggregateRoot extends AggregateRoot> {
  config?(): MongoConfig;
}

@injectable()
export abstract class MongoRepository<TAggregateRoot extends AggregateRoot> {
  constructor(
    @inject(MongoClientFactory) private clientFactory: MongoClientFactory,
  ) { }

  protected abstract moduleName(): string;

  protected async collection() {
    return (await this.client()).db().collection(this.moduleName());
  }

  protected client(): Promise<MongoClient> {
    return this.clientFactory.getClient(this.moduleName(), this.config?.call(this) || globalConfig.mongo);
  }

  protected async findOne<T = any>(id: string): Promise<T | null> {
    const collection = await this.collection();
    return await collection.findOne({ _id: id }) as T | null;
  }
  protected async findMany<T = any>(query: object = {}): Promise<T[]> {
    const collection = await this.collection();
    const data = await collection.find(query).toArray();
    return data as any as T[];
  }
  protected async persist(id: string, aggregateRoot: TAggregateRoot): Promise<void> {
    const document = { ...aggregateRoot.toPrimitives(), _id: id, id: undefined };
    const collection = await this.collection();
    await collection.updateOne({ _id: id }, { $set: document }, { upsert: true });
  }
}
