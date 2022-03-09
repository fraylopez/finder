import { AnyObject } from "../AnyObject";

export interface PrimitiveDomainEvent {
  eventName: string;
  aggregateId: string;
  eventId: string;
  timestamp: number;
  payload?: AnyObject;
}
