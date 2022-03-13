import { DomainEventMapping } from "../../infrastructure/bus/event/DomainEventMapping";
import { DomainEvent } from './DomainEvent';
import { EventHandler } from './EventHandler';

export interface EventBus {
  setDomainEventMapping(domainEventMapping: DomainEventMapping): void;
  publish(events: Array<DomainEvent>): Promise<void>;
  addSubscribers(subscribers: Array<EventHandler<DomainEvent>>): void;
  start(): Promise<void>;
}
