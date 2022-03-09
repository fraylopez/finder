import { Uuid } from "../../../_shared/domain/value-object/Uuid";

interface Primitives {
  cardId: string,
  right: boolean,
  score: number,
}
export class Swipe {
  constructor(
    public readonly cardId: Uuid,
    public readonly right: boolean,
    public readonly score: number,
  ) { }

  static fromPrimitives(primitives: Primitives) {
    return new Swipe(
      new Uuid(primitives.cardId),
      primitives.right,
      primitives.score
    );
  }

  toPrimitives(): Primitives {
    return {
      cardId: this.cardId.toString(),
      right: this.right,
      score: this.score,
    };
  }
}
