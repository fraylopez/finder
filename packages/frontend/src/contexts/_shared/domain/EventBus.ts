import { DomainEvent } from "../../_core/domain/DomainEvent";
import { EventHandler } from "../../_core/domain/EventHandler";

export interface EventBus {
  subscribe(handler: EventHandler): void;
  publish(event: DomainEvent[]): Promise<void>;
}
