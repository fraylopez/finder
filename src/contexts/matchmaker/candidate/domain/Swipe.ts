import { Uuid } from "../../../_shared/domain/value-object/Uuid";

export class Swipe {
  constructor(
    public readonly cardId: Uuid,
    public readonly right: boolean,
    public readonly score: number,
  ) { }

  toPrimitives() {
    return {
      cardId: this.cardId.toString(),
      right: this.right,
      score: this.score,
    };
  }
}
