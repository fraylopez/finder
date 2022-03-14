import { injectable } from "inversify";
import { ImageMother } from "../../../../../test/contexts/_shared/domain/ImageMother";
import { Uuid } from "../../../_core/domain/value-object/Uuid";
import { MemoryRepository } from "../../../_core/infrastructure/persistence/memory/MemoryReposirtory";
import { Card } from "../../../_shared/domain/card/Card";
import { CardRepository } from "../../../_shared/domain/card/CardRepository";

@injectable()
export class MemoryCardRepository extends MemoryRepository<Card> implements CardRepository {
  constructor() {
    super();
    this.items = testData;// .reverse(); // TODO: fix frontend
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
  new Card(Uuid.random(), "Are you human?", undefined, ImageMother.random()),
  new Card(Uuid.random(), "Or are you dancer?", undefined, ImageMother.random()),
  new Card(Uuid.random(), "Interested in tech?", undefined, ImageMother.random()),
  new Card(Uuid.random(), "Fast vs Good?", undefined, ImageMother.random()),
  new Card(Uuid.random(), "Are you ready to lead but your company thinks otherwise?", undefined, ImageMother.random()),
  new Card(Uuid.random(), "This guy...", { right: 1, left: 0 }, "https://live.staticflickr.com/65/173640462_966475e574_b.jpg"),
];