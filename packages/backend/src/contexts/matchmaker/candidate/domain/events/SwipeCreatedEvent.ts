import { DomainEvent } from "../../../../_core/domain/bus/DomainEvent";
import { PrimitiveDomainEvent } from "../../../../_core/domain/bus/PrimitiveDomainEvent";
import { Uuid } from "../../../../_core/domain/value-object/Uuid";

export class SwipeCreatedEvent extends DomainEvent {
  static readonly NAME = 'swipe.created';
  constructor(uid: Uuid, public readonly cardId: Uuid, public readonly right: boolean) {
    super(SwipeCreatedEvent.NAME, uid.toString());
  }

  static fromPrimitives(primitives: PrimitiveDomainEvent) {
    return new SwipeCreatedEvent(
      new Uuid(primitives.aggregateId),
      new Uuid(primitives.payload!.cardId),
      primitives.payload!.right
    );
  }

  getPayloadPrimitives() {
    return {
      cardId: this.cardId.toString(),
      right: this.right
    };
  }
}
