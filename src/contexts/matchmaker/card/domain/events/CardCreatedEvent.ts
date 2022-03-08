import { DomainEvent } from "../../../../_shared/domain/bus/DomainEvent";
import { PrimitiveDomainEvent } from "../../../../_shared/domain/bus/PrimitiveDomainEvent";
import { Uuid } from "../../../../_shared/domain/value-object/Uuid";

export class CardCreatedEvent extends DomainEvent {
  static readonly NAME = 'card.created';
  constructor(cardId: Uuid) {
    super(CardCreatedEvent.NAME, cardId.toString());
  }

  static fromPrimitives(primitives: PrimitiveDomainEvent) {
    return new CardCreatedEvent(new Uuid(primitives.aggregateId));
  }
}
