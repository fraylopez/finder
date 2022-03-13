import { DomainEvent } from "../../../../_core/domain/bus/DomainEvent";
import { PrimitiveDomainEvent } from "../../../../_core/domain/bus/PrimitiveDomainEvent";
import { Uuid } from "../../../../_core/domain/value-object/Uuid";

export class CardCreatedEvent extends DomainEvent {
  static readonly NAME = 'card.created';
  constructor(cardId: Uuid) {
    super(CardCreatedEvent.NAME, cardId.toString());
  }

  static fromPrimitives(primitives: PrimitiveDomainEvent) {
    return new CardCreatedEvent(new Uuid(primitives.aggregateId));
  }
}
