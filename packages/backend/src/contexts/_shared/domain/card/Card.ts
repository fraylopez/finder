import { AggregateRoot } from "../../../_core/domain/AggregateRoot";
import { Uuid } from "../../../_core/domain/value-object/Uuid";
import { CardCreatedEvent } from "./events/CardCreatedEvent";

interface Params {
  id: Uuid,
  title: string,
  score?: { left: number, right: number; },
  imageUrl?: string,
}
export class Card extends AggregateRoot {
  public readonly score: { left: number, right: number; };
  constructor(
    public readonly id: Uuid,
    public readonly title: string,
    score?: { left: number, right: number; },
    public readonly imageUrl?: string,
  ) {
    super();
    this.score = score || { left: 0, right: 0 };
  }

  static create({ id, title, imageUrl, score }: Params) {
    const card = new Card(id, title, score, imageUrl);
    card.record(new CardCreatedEvent(card.id));
    return card;
  }

  static fromPrimitives(primitives: any) {
    return new Card(primitives.id, primitives.title, primitives.score, primitives.imageUrl);
  }

  toPrimitives() {
    return {
      id: this.id,
      title: this.title,
      score: this.score,
      imageUrl: this.imageUrl,
    };
  }

}
