import { DomainEvent } from "./DomainEvent";
import { EventHandler } from "./EventHandler";

export interface EventBus {
  subscribe(handler: EventHandler): void;
  publish(event: DomainEvent[]): Promise<void>;
}
