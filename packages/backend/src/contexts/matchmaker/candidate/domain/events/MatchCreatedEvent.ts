import { DomainEvent } from "../../../../_core/domain/bus/DomainEvent";
import { PrimitiveDomainEvent } from "../../../../_core/domain/bus/PrimitiveDomainEvent";
import { Uuid } from "../../../../_core/domain/value-object/Uuid";


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
