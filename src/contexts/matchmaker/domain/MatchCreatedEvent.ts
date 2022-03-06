import { DomainEvent } from "../../_shared/domain/DomainEvent";
import { PrimitiveDomainEvent } from "../../_shared/domain/PrimitiveDomainEvent";
import { Uuid } from "../../_shared/domain/value-object/Uuid";

export class MatchCreatedEvent extends DomainEvent {
  static readonly NAME = 'match.created';
  constructor(matchId: Uuid) {
    super(MatchCreatedEvent.NAME, matchId.toString());
  }

  static fromPrimitives(primitives: PrimitiveDomainEvent) {
    return new MatchCreatedEvent(new Uuid(primitives.aggregateId));
  }
}
