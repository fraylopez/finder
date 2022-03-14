import { DomainEvent } from "./DomainEvent";
import { DomainEventClass } from "./DomainEventClass";

export interface EventHandler<T extends DomainEvent = DomainEvent> {
  subscribedTo(): DomainEventClass[];
  handle(event: T): void | Promise<void>;
}
