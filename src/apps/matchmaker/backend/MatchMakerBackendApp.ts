import { DomainEvent } from "../../../contexts/_shared/domain/bus/DomainEvent";
import { EventHandler } from "../../../contexts/_shared/domain/bus/EventHandler";
import { EventBus } from "../../../contexts/_shared/domain/bus/EventBus";
import { DomainEventMapping } from "../../../contexts/_shared/infrastructure/bus/event/DomainEventMapping";
import { container } from "./ioc/installer";
import { types } from "./ioc/types";
import { Server } from './server';
import { EventExposer } from "../../../contexts/matchmaker/candidate/domain/EventExposer";

export class MatchMakerBackendApp {
  private server?: Server;

  async start() {
    const port = process.env.PORT || '3000';
    this.server = new Server(port);
    await this.registerSubscribers();

    await this.server.listen();
    const websocket: EventExposer = container.get(types.EventExposer);
    websocket.init(this.server);
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
