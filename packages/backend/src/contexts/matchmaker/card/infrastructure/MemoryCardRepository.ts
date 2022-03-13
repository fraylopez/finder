import { injectable } from "inversify";
import { CardMother } from "../../../../../test/contexts/_shared/domain/card/CardMother";
import { Uuid } from "../../../_core/domain/value-object/Uuid";
import { Card } from "../../../_shared/domain/card/Card";
import { CardRepository } from "../../../_shared/domain/card/CardRepository";

@injectable()
export class MemoryCardRepository implements CardRepository {
  protected cards: Card[];
  constructor() {
    this.cards = testData;
  }
  find(id: Uuid): Promise<Card | null> {
    return Promise.resolve(
      this.cards.find(c => c.id.equals(id)) || null
    );
  }

  add(card: Card): Promise<void> {
    this.cards.push(card);
    return Promise.resolve();
  }

  searchAll(): Promise<Card[]> {
    return Promise.resolve(this.cards);
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