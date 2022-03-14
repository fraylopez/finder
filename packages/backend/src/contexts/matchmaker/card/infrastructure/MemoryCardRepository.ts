import { injectable } from "inversify";
import { CardMother } from "../../../../../test/contexts/_shared/domain/card/CardMother";
import { Uuid } from "../../../_core/domain/value-object/Uuid";
import { MemoryRepository } from "../../../_core/infrastructure/persistence/memory/MemoryReposirtory";
import { Card } from "../../../_shared/domain/card/Card";
import { CardRepository } from "../../../_shared/domain/card/CardRepository";

@injectable()
export class MemoryCardRepository extends MemoryRepository<Card> implements CardRepository {
  constructor() {
    super();
    this.items = testData;
  }
  find(id: Uuid): Promise<Card | null> {
    return this.findOne(id.toString(), (card: Card) => card.id.toString());
  }

  findAll(): Promise<Card[]> {
    return this.findMany();
  }

  async add(card: Card): Promise<void> {
    await this.persist(card.id.toString(), card);
  }
}

const testData = [
  CardMother.random(),
  CardMother.random(),
  CardMother.random(),
  CardMother.random(),
  CardMother.random(),
  CardMother.random(),
];