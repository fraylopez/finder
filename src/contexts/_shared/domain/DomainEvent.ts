import { Uuid } from './value-object/Uuid';

export interface DomainEvent {
  getPayloadPrimitives?(): object;
}
export abstract class DomainEvent {
  static NAME: string;
  static fromPrimitives: (...args: any[]) => any;
  readonly aggregateId: string;
  readonly eventId: string;
  readonly timestamp: number;
  readonly eventName: string;

  constructor(eventName: string, aggregateId: string, eventId?: string, occurredOn?: number) {
    this.eventName = eventName;
    this.aggregateId = aggregateId;
    this.eventId = eventId || Uuid.random().value;
    this.timestamp = occurredOn || Date.now();
  }

  toPrimitives(): object {
    return {
      aggregateId: this.aggregateId,
      eventName: this.eventName,
      eventId: this.eventId,
      timestamp: this.timestamp,
      payload: this.getPayloadPrimitives?.call(this),
    };
  }
}

export type DomainEventClass = { NAME: string, fromPrimitives(...args: any[]): DomainEvent; };
