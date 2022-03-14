import { DomainEventClass } from "./DomainEventClass";
import { PrimitiveDomainEvent } from "./PrimitiveDomainEvent";

export abstract class DomainEvent {
  static NAME: string;
  constructor(
    public readonly eventName: string,
    public readonly aggregateId: string,
    public readonly payload?: object
  ) { }

  toPrimitives(): object {
    return {
      aggregateId: this.aggregateId,
      eventName: this.eventName,
      payload: this.payload
    };
  }

  static fromPrimitives(this: DomainEventClass, primitives: PrimitiveDomainEvent) {
    return new this(primitives.eventName, primitives.aggregateId, primitives.payload);
  }
}

