import { AggregateRoot } from "../../_shared/domain/AggregateRoot";

export class Match extends AggregateRoot {

  constructor(public readonly id: string) {
    super();
  }

  static create(id: string) {
    return new Match(id);
  }
  toPrimitives() {
    return {
      id: this.id
    };
  }

}