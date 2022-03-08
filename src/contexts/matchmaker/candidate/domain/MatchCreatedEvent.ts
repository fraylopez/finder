import { DomainEvent } from "../../../_shared/domain/DomainEvent";
import { PrimitiveDomainEvent } from "../../../_shared/domain/PrimitiveDomainEvent";
import { Uuid } from "../../../_shared/domain/value-object/Uuid";


export class MatchCreatedEvent extends DomainEvent {
  static readonly NAME = 'match.created';
  constructor(uid: Uuid) {
    super(MatchCreatedEvent.NAME, uid.toString());
  }

  static fromPrimitives(primitives: PrimitiveDomainEvent) {
    return new MatchCreatedEvent(
      new Uuid(primitives.aggregateId)
    );
  }

}
