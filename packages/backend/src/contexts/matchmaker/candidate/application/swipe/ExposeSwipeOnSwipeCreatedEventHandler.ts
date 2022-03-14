import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/matchmaker/ioc/types";
import { DomainEvent } from "../../../../_core/domain/bus/DomainEvent";
import { DomainEventClass } from "../../../../_core/domain/bus/DomainEventClass";
import { EventHandler } from "../../../../_core/domain/bus/EventHandler";
import { EventExposer } from "../../domain/EventExposer";
import { SwipeCreatedEvent } from "../../domain/events/SwipeCreatedEvent";

@injectable()
export class ExposeSwipeOnSwipeCreatedEventHandler implements EventHandler {

  constructor(@inject(types.EventExposer) private readonly exposer: EventExposer) { }

  subscribedTo(): DomainEventClass[] {
    return [SwipeCreatedEvent];
  }

  handle(domainEvent: DomainEvent): void | Promise<void> {
    this.exposer.expose(domainEvent);
  }

}
