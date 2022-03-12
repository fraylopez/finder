

export interface PrimitiveDomainEvent {
  eventName: string;
  aggregateId: string;
  payload?: any;
}
