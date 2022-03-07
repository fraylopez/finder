import { DomainEvent } from "../../../_shared/domain/DomainEvent";
import { PrimitiveDomainEvent } from "../../../_shared/domain/PrimitiveDomainEvent";
import { Uuid } from "../../../_shared/domain/value-object/Uuid";
import { SwipeCreatedEvent } from "./SwipeCreatedEvent";


export class CandidateMatchCreatedEvent extends DomainEvent {
  static readonly NAME = 'candidate.match.created';
  constructor(uid: Uuid) {
    super(SwipeCreatedEvent.NAME, uid.toString());
  }

  static fromPrimitives(primitives: PrimitiveDomainEvent) {
    return new CandidateMatchCreatedEvent(
      new Uuid(primitives.aggregateId)
    );
  }

}
