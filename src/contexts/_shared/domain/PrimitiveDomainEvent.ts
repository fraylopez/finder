export interface PrimitiveDomainEvent {
  eventName: string;
  aggregateId: string;
  eventId: string;
  timestamp: number;
  payload?: Record<string, any>;
}
