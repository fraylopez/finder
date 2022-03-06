import { DomainEvent } from '../../../domain/DomainEvent';
import { EventHandler } from '../../../domain/EventHandler';
import { WildcardEvent } from "../../../domain/WildcardEvent";

export class EventEmitterBus {
  constructor(private readonly subscribers: Array<EventHandler<DomainEvent>>) {
    this.registerSubscribers(subscribers);
  }

  registerSubscribers(subscribers?: EventHandler<DomainEvent>[]) {
    this.subscribers.push(...subscribers || []);
  }

  publish(events: DomainEvent[]): void {
    events.forEach(event => {
      this.subscribers
        .filter(s => s.subscribedTo()
          .some(e => e.NAME === event.eventName || e.NAME === WildcardEvent.NAME))
        .forEach(h => h.handle(event))
        ;
    });
  }
}
