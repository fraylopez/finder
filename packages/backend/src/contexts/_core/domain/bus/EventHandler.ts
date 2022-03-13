import { DomainEvent } from './DomainEvent';
import { DomainEventClass } from "./DomainEventClass";

export interface EventHandler<T extends DomainEvent = DomainEvent> {
  subscribedTo(): Array<DomainEventClass>;
  handle(domainEvent: T): void | Promise<void>;
}

export interface MessageHandler<T extends {}> {
  subscribedTo(): Array<DomainEventClass>;
  handle(domainEvent: T): void | Promise<void>;
}
