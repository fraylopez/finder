import { AggregateRoot } from "../../../_shared/domain/AggregateRoot";
import { Uuid } from "../../../_shared/domain/value-object/Uuid";
import { CardCreatedEvent } from "./CardCreatedEvent";

interface Params {
  id: Uuid,
  title: string,
  imageUrl?: string,
}
export class Card extends AggregateRoot {

  constructor(
    public readonly id: Uuid,
    public readonly title: string,
    public readonly imageUrl?: string,
  ) {
    super();
  }

  static create({ id, title, imageUrl }: Params) {
    const card = new Card(id, title, imageUrl);
    card.record(new CardCreatedEvent(card.id));
    return card;
  }

  static fromPrimitives(primitives: Record<string, any>) {
    return new Card(primitives.id, primitives.title, primitives.imageUrl);
  }

  toPrimitives() {
    return {
      id: this.id,
      title: this.title,
      imageUrl: this.imageUrl,
    };
  }

}
