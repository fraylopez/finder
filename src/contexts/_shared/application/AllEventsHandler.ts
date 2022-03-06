import { inject, injectable } from "inversify";
import { DomainEventClass, DomainEvent } from "../domain/DomainEvent";
import { EventHandler } from "../domain/EventHandler";
import { WildcardEvent } from "../domain/WildcardEvent";
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