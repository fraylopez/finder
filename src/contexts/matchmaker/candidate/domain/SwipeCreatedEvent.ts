import { DomainEvent } from "../../../_shared/domain/DomainEvent";
import { PrimitiveDomainEvent } from "../../../_shared/domain/PrimitiveDomainEvent";
import { Uuid } from "../../../_shared/domain/value-object/Uuid";

export class SwipeCreatedEvent extends DomainEvent {
  static readonly NAME = 'swipe.created';
  constructor(uid: Uuid, private readonly matchId: Uuid, private readonly right: boolean) {
    super(SwipeCreatedEvent.NAME, uid.toString());
  }

  static fromPrimitives(primitives: PrimitiveDomainEvent) {
    return new SwipeCreatedEvent(
      new Uuid(primitives.aggregateId),
      new Uuid(primitives.payload!.matchId),
      primitives.payload!.right
    );
  }

  getPayloadPrimitives() {
    return {
      matchId: this.matchId.toString(),
      right: this.right
    };
  }
}
