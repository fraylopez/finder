import { AggregateRoot } from "../../../_shared/domain/AggregateRoot";
import { Uuid } from "../../../_shared/domain/Uuid";
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



