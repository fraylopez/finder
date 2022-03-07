import { Uuid } from "../../../_shared/domain/value-object/Uuid";

export class Swipe {
  constructor(
    public readonly id: Uuid,
    public readonly cardId: Uuid,
    public readonly right: boolean,
    public readonly score: number = 0,
  ) { }

  toPrimitives() {
    return {
      id: this.id.toString(),
      cardId: this.cardId.toString(),
      right: this.right,
    };
  }
}
