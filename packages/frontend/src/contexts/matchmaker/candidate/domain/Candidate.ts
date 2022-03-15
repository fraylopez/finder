import { AggregateRoot } from "../../../_core/domain/AggregateRoot";
import { Uuid } from "../../../_core/domain/Uuid";
import { CandidateCreatedEvent } from "./CandidateCreatedEvent";

export class Candidate extends AggregateRoot {

  constructor(public readonly id: string) {
    super();
  }

  static create() {
    const candidate = new Candidate(Uuid.random().toString());
    candidate.record(new CandidateCreatedEvent(candidate.id));
    return candidate;
  }

  toPrimitives() {
    return {
      id: this.id
    };
  }
}



