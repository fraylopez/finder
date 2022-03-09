import { DomainEvent } from "../../../domain/bus/DomainEvent";
import { EventHandler } from "../../../domain/bus/EventHandler";
import { EventBus } from "../../../domain/bus/EventBus";
import { DomainEventMapping } from "./DomainEventMapping";
import { EventEmitterBus } from "./EventEmitterBus";
import { injectable, multiInject } from "inversify";


@injectable()
export class InMemoryAsyncEventBus implements EventBus {
  private bus: EventEmitterBus;

  constructor() {
    this.bus = new EventEmitterBus([]);
  }

  async start(): Promise<void> { }

  async publish(events: DomainEvent[]): Promise<void> {
    this.bus.publish(events);
  }

  addSubscribers(subscribers: Array<EventHandler<DomainEvent>>) {
    this.bus.registerSubscribers(subscribers);
  }

  setDomainEventMapping(domainEventMapping: DomainEventMapping): void { }
}
