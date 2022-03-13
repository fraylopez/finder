import { inject, injectable } from "inversify";
import { DomainEvent } from "../../_core/domain/bus/DomainEvent";
import { DomainEventClass } from "../../_core/domain/bus/DomainEventClass";
import { EventHandler } from "../../_core/domain/bus/EventHandler";
import { WildcardEvent } from "../../_core/domain/bus/WildcardEvent";
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