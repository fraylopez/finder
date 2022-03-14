import { injectable } from "inversify";
import { Nullable } from "../../../_core/domain/Nullable";
import { Uuid } from "../../../_core/domain/value-object/Uuid";
import { MongoRepository } from "../../../_core/infrastructure/persistence/mongo/MongoRepository";
import { Card } from "../../../_shared/domain/card/Card";
import { CardRepository } from "../../../_shared/domain/card/CardRepository";

@injectable()
export class MongoCardRepository extends MongoRepository<Card> implements CardRepository {
  protected moduleName(): string {
    return "card";
  }

  async find(id: Uuid): Promise<Nullable<Card>> {
    const doc = await this.findOne(id.toString());
    return doc ? Card.fromPrimitives({ ...doc, id: doc._id }) : null;
  }

  async add(card: Card): Promise<void> {
    await this.persist(card.id.toString(), card);
  }

  async findAll(): Promise<Card[]> {
    const docs = await this.findMany();
    return docs.map(doc => Card.fromPrimitives({ ...doc, id: doc._id }));
  }
}