import { Uuid } from "../../../_shared/domain/value-object/Uuid";

export class Swipe {
  constructor(
    public readonly id: Uuid,
    public readonly matchId: Uuid,
    public readonly right: boolean
  ) { }

  toPrimitives() {
    return {
      id: this.id.toString(),
      matchId: this.matchId.toString(),
      right: this.right,
    };
  }
}
