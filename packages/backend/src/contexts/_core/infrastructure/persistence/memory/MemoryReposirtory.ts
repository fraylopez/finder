import { injectable } from "inversify";
import { AggregateRoot } from "../../../domain/AggregateRoot";

@injectable()
export class MemoryRepository<T extends AggregateRoot> {
  protected items: T[];
  constructor() {
    this.items = [];
  }

  protected async findOne(id: string, getId: (item: T) => string): Promise<T | null> {
    const item = this.items.find(item => getId(item) === id);
    return Promise.resolve(item || null);
  }
  protected async findMany(queryFn: (item: T) => boolean = () => true): Promise<T[]> {
    const filteredItems = this.items.filter(item => queryFn(item));
    return Promise.resolve(filteredItems);
  }
  protected async persist(_id: string, aggregateRoot: T): Promise<void> {
    this.items.push(aggregateRoot);
    return Promise.resolve();
  }
  protected async updateOne(_id: string, aggregateRoot: T, getId: (item: T) => string): Promise<void> {
    const index = this.items.findIndex(i => getId(i) === _id);
    this.items[index] = aggregateRoot;
    return Promise.resolve();
  }
}