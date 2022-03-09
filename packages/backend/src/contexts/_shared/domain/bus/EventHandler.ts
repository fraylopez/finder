import { DomainEvent, DomainEventClass } from './DomainEvent';

export interface EventHandler<T extends DomainEvent = DomainEvent> {
  subscribedTo(): Array<DomainEventClass>;
  handle(domainEvent: T): void | Promise<void>;
}
