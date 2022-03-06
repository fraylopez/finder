import { AggregateRoot } from "../../../_shared/domain/AggregateRoot";
import { Uuid } from "../../../_shared/domain/value-object/Uuid";
import { MatchCreatedEvent } from "./MatchCreatedEvent";

interface Params {
  id: Uuid,
  title: string,
  imageUrl?: string,
}
export class Match extends AggregateRoot {

  constructor(
    public readonly id: Uuid,
    public readonly title: string,
    public readonly imageUrl?: string,
  ) {
    super();
  }

  static create({ id, title, imageUrl }: Params) {
    const match = new Match(id, title, imageUrl);
    match.record(new MatchCreatedEvent(match.id));
    return match;
  }

  static fromPrimitives(primitives: Record<string, any>) {
    return new Match(primitives.id, primitives.title, primitives.imageUrl);
  }

  toPrimitives() {
    return {
      id: this.id,
      title: this.title,
      imageUrl: this.imageUrl,
    };
  }

}
