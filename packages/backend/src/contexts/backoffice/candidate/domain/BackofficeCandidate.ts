import { AggregateRoot } from "../../../_core/domain/AggregateRoot";
import { Uuid } from "../../../_core/domain/value-object/Uuid";

type Primitives = {
  id: string;
  score: number;
};

export class BackofficeCandidate extends AggregateRoot {

  constructor(
    public readonly id: Uuid,
    public readonly score: number,
  ) {
    super();
  }

  static fromPrimitives({ id, score }: Primitives) {
    return new BackofficeCandidate(new Uuid(id), score);
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      score: this.score,
    };
  }

}