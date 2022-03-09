import { AggregateRoot } from "../../../_shared/domain/AggregateRoot";
import { Uuid } from "../../../_shared/domain/value-object/Uuid";
import { CardCreatedEvent } from "./events/CardCreatedEvent";

interface Params {
  id: Uuid,
  title: string,
  score: number,
  imageUrl?: string,
}
export class Card extends AggregateRoot {

  constructor(
    public readonly id: Uuid,
    public readonly title: string,
    public readonly score: number,
    public readonly imageUrl?: string,
  ) {
    super();
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
