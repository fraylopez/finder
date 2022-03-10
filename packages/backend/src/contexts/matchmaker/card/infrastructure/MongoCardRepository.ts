import { injectable } from "inversify";
import { Nullable } from "../../../_shared/domain/Nullable";
import { Uuid } from "../../../_shared/domain/value-object/Uuid";
import { MongoRepository } from "../../../_shared/infrastructure/persistence/mongo/MongoRepository";
import { Card } from "../domain/Card";
import { CardRepository } from "../domain/CardRepository";

@injectable()
export class MongoCardRepository extends MongoRepository<Card> implements CardRepository {
  protected moduleName(): string {
    return "card";
  }

  async find(id: Uuid): Promise<Nullable<Card>> {
    const doc = await this.findOne(id.toString());
    return doc ? Card.fromPrimitives({ ...doc, id: new Uuid(doc._id) }) : null;
  }

  async add(card: Card): Promise<void> {
    await this.persist(card.id.toString(), card);
  }

  async searchAll(): Promise<Card[]> {
    const docs = await this.findMany();
    return docs.map(doc => Card.fromPrimitives({ ...doc, id: new Uuid(doc._id) }));
  }
}