import { AggregateRoot } from "../../../_shared/domain/AggregateRoot";
import { Uuid } from "../../../_shared/domain/value-object/Uuid";
import { CandidateCreatedEvent } from "./CandidateCreatedEvent";
import { Swipe } from "./Swipe";
import { SwipeCreatedEvent } from "./SwipeCreatedEvent";

type Params = {
  id: Uuid;
};
export class Candidate extends AggregateRoot {
  private readonly swipes: Swipe[];
  constructor(
    public readonly id: Uuid,
  ) {
    super();
    this.swipes = [];
  }
  static create({ id }: Params) {
    const candidate = new Candidate(id);
    candidate.record(new CandidateCreatedEvent(candidate.id));
    return candidate;
  }

  swipe(swipe: Swipe) {
    this.swipes.push(swipe);
    this.record(new SwipeCreatedEvent(swipe.matchId, this.id, swipe.right));
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      swipes: this.swipes.map(m => m.toPrimitives())
    };
  }

}
