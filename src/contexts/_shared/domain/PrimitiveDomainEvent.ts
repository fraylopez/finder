export interface PrimitiveDomainEvent {
  eventName: string;
  aggregateId: string;
  eventId: string;
  timestamp: number;
  payload?: object;
}
