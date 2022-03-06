import { DomainEvent } from "../../../contexts/_shared/domain/DomainEvent";
import { EventHandler } from "../../../contexts/_shared/domain/EventHandler";
import { EventBus } from "../../../contexts/_shared/domain/EventBus";
import { DomainEventMapping } from "../../../contexts/_shared/infrastructure/bus/event/DomainEventMapping";
import { container } from "./ioc/installer";
import { types } from "./ioc/types";
import { Server } from './server';

export class MatchMakerBackendApp {
  private server?: Server;

  async start() {
    const port = process.env.PORT || '3000';
    this.server = new Server(port);
    await this.registerSubscribers();
    return this.server.listen();
  }

  async stop() {
    await this.server?.stop();
  }

  get port(): string {
    if (!this.server) {
      throw new Error('Backoffice backend application has not been started');
    }
    return this.server.port;
  }

  get httpServer() {
    return this.server?.httpServer;
  }

  private async registerSubscribers() {
    const eventBus = container.get<EventBus>(types.EventBus);
    const eventHandlers = container.getAll<EventHandler>(types.EventHandler);

    const domainEventMapping = new DomainEventMapping(eventHandlers);

    eventBus.setDomainEventMapping(domainEventMapping);
    eventBus.addSubscribers(eventHandlers);
    await eventBus.start();
  }
}
