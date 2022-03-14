import { EventHandler } from "../../contexts/_core/domain/bus/EventHandler";
import { EventBus } from "../../contexts/_core/domain/bus/EventBus";
import { DomainEventMapping } from "../../contexts/_core/infrastructure/bus/event/DomainEventMapping";
import { container } from "./ioc/installer";
import { Server } from './server';
import { coreTypes } from "../_core/ioc/coreTypes";

export class MatchMakerBackendApp {
  private server?: Server;

  async start() {
    const port = process.env.PORT || '3000';
    this.server = new Server(port);
    await this.registerSubscribers();

    await this.server.listen();

  }

  async stop() {
    await this.server?.stop();
  }

  get port(): string {
    if (!this.server) {
      throw new Error('Matchmaker backend application has not been started');
    }
    return this.server.port;
  }

  get httpServer() {
    return this.server?.httpServer;
  }

  private async registerSubscribers() {
    const eventBus = container.get<EventBus>(coreTypes.EventBus);
    const eventHandlers = container.getAll<EventHandler>(coreTypes.EventHandler);

    const domainEventMapping = new DomainEventMapping(eventHandlers);

    eventBus.setDomainEventMapping(domainEventMapping);
    eventBus.addSubscribers(eventHandlers);
    await eventBus.start();
  }
}
