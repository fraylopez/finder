import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/matchmaker/backend/ioc/types";
import { DomainEvent } from "../../../../_shared/domain/bus/DomainEvent";
import { DomainEventClass } from "../../../../_shared/domain/bus/DomainEventClass";
import { EventHandler } from "../../../../_shared/domain/bus/EventHandler";
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
