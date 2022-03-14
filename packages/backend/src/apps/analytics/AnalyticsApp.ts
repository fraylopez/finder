import { EventHandler } from "../../contexts/_core/domain/bus/EventHandler";
import { EventBus } from "../../contexts/_core/domain/bus/EventBus";
import { DomainEventMapping } from "../../contexts/_core/infrastructure/bus/event/DomainEventMapping";
import { coreTypes } from "../_core/ioc/coreTypes";
import { container } from "./ioc/installer";

export class AnalyticsApp {

  async start() {
    await this.registerSubscribers();
  }
  async stop() {/*  */ }

  private async registerSubscribers() {
    const eventBus = container.get<EventBus>(coreTypes.EventBus);
    const eventHandlers = container.getAll<EventHandler>(coreTypes.EventHandler);
    const domainEventMapping = new DomainEventMapping(eventHandlers);

    eventBus.setDomainEventMapping(domainEventMapping);
    eventBus.addSubscribers(eventHandlers);
    await eventBus.start();
  }
}
