import { AggregateRoot } from "../../_shared/domain/AggregateRoot";

export class Match extends AggregateRoot {
  constructor(public readonly id: string) {
    super();
  }
  toPrimitives() {
    throw new Error("Method not implemented.");
  }

}