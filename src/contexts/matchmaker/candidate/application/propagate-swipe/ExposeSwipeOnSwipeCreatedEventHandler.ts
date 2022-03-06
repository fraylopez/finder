import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/matchmaker/backend/ioc/types";
import { DomainEventClass, DomainEvent } from "../../../../_shared/domain/DomainEvent";
import { EventHandler } from "../../../../_shared/domain/EventHandler";
import { SwipeCreatedEvent } from "../../domain/SwipeCreatedEvent";
import { EventExposer } from "../../domain/EventExposer";

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
