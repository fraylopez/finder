import { injectable } from "inversify";
import { CardMother } from "../../../../../test/contexts/matchmaker/card/domain/CardMother";
import { Uuid } from "../../../_shared/domain/value-object/Uuid";
import { Card } from "../domain/Card";
import { CardRepository } from "../domain/CardRepository";

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