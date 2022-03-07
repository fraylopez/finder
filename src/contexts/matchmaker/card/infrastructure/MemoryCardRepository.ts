import { injectable } from "inversify";
import { CardImageMother } from "../../../../../test/contexts/matchmaker/card/domain/CardImageMother";
import { CardTitleMother } from "../../../../../test/contexts/matchmaker/card/domain/CardTitleMother";
import { Uuid } from "../../../_shared/domain/value-object/Uuid";
import { Card } from "../domain/Card";
import { CardRepository } from "../domain/CardRepository";

@injectable()
export class MemoryCardRepository implements CardRepository {
  protected cards: Card[];
  constructor() {
    this.cards = testData;
  }

  insert(card: Card): Promise<void> {
    this.cards.push(card);
    return Promise.resolve();
  }

  searchAll(): Promise<Card[]> {
    return Promise.resolve(this.cards);
  }

}

const testData = [
  Card.create({ id: Uuid.random(), title: CardTitleMother.random(), imageUrl: CardImageMother.random() }),
  Card.create({ id: Uuid.random(), title: CardTitleMother.random(), imageUrl: CardImageMother.random() }),
];