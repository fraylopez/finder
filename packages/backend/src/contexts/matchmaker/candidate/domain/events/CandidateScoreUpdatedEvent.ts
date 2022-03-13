import { DomainEvent } from "../../../../_core/domain/bus/DomainEvent";
import { PrimitiveDomainEvent } from "../../../../_core/domain/bus/PrimitiveDomainEvent";
import { Uuid } from "../../../../_core/domain/value-object/Uuid";

export class CandidateScoreUpdatedEvent extends DomainEvent {
  static readonly NAME = 'candidate.score.updated';
  constructor(uid: Uuid) {
    super(CandidateScoreUpdatedEvent.NAME, uid.toString());
  }

  static fromPrimitives(primitives: PrimitiveDomainEvent) {
    return new CandidateScoreUpdatedEvent(
      new Uuid(primitives.aggregateId),
    );
  }
}
