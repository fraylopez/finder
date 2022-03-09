import { inject, injectable } from "inversify";
import { DomainEvent } from "../domain/bus/DomainEvent";
import { DomainEventClass } from "../domain/bus/DomainEventClass";
import { EventHandler } from "../domain/bus/EventHandler";
import { WildcardEvent } from "../domain/bus/WildcardEvent";
import { EventLogger } from "./EventLogger";

@injectable()
export class AllEventsHandler implements EventHandler {
  constructor(@inject(EventLogger) private readonly eventLogger: EventLogger) { }
  subscribedTo(): DomainEventClass[] {
    return [WildcardEvent];
  }
  handle(domainEvent: DomainEvent) {
    this.eventLogger.log(domainEvent);
  }
}