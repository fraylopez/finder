import { DomainEvent } from "../../_shared/domain/DomainEvent";
import { EventBus } from "../../_shared/domain/EventBus";
import { EventHandler } from "../../_shared/domain/EventHandler";

export class InMemoryEventBus implements EventBus {
  private readonly handlers: EventHandler[];
  constructor() {
    this.handlers = [];
  }
  subscribe(handler: EventHandler) {
    this.handlers.push(handler);
  }
  async publish(events: DomainEvent[]) {
    await Promise.all(
      events.map(event =>
        this.handlers
          .filter(h => h.subscribedTo().some(k => k.NAME === event.eventName))
          .map(h => h.handle(event))
      )
    );
  }
}

