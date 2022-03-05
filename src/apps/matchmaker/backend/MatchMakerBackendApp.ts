import { Server } from './server';

export class MatchMakerBackendApp {
  private server?: Server;

  async start() {
    const port = process.env.PORT || '3000';
    this.server = new Server(port);
    // await this.registerSubscribers();
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

  // private async registerSubscribers() {
  //   const eventBus = container.get('Shared.EventBus') as EventBus;
  //   const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<String, Definition>;
  //   const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

  //   subscriberDefinitions.forEach((value: any, key: any) => subscribers.push(container.get(key)));
  //   const domainEventMapping = new DomainEventMapping(subscribers);

  //   eventBus.setDomainEventMapping(domainEventMapping);
  //   eventBus.addSubscribers(subscribers);
  //   await eventBus.start();
  // }
}
