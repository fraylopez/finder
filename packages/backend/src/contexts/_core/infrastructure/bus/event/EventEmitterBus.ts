import { DomainEvent } from '../../../domain/bus/DomainEvent';
import { EventHandler } from '../../../domain/bus/EventHandler';
import { WildcardEvent } from "../../../domain/bus/WildcardEvent";

export class EventEmitterBus {
  constructor(private readonly subscribers: Array<EventHandler<DomainEvent>>) {
    this.registerSubscribers(subscribers);
  }

  registerSubscribers(subscribers?: EventHandler<DomainEvent>[]) {
    this.subscribers.push(...subscribers || []);
  }

  async publish(events: DomainEvent[]) {
    await Promise.all(
      events.map(event =>
        Promise.all(
          this.subscribers
            .filter(s => s.subscribedTo()
              .some(e => e.NAME === event.eventName || e.NAME === WildcardEvent.NAME))
            .map(h => h.handle(event))
        )
      )
    );
  }
}
