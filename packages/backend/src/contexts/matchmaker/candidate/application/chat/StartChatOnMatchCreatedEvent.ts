import { inject, injectable } from "inversify";
import { DomainEvent } from "../../../../_shared/domain/bus/DomainEvent";
import { DomainEventClass } from "../../../../_shared/domain/bus/DomainEventClass";
import { EventHandler } from "../../../../_shared/domain/bus/EventHandler";
import { SwipeCreatedEvent } from "../../domain/events/SwipeCreatedEvent";
import { ChatController } from "./ChatController";

@injectable()
export class StartChatOnMatchCreatedEvent implements EventHandler {

  constructor(@inject(ChatController) private readonly controller: ChatController) { }

  subscribedTo(): DomainEventClass[] {
    return [SwipeCreatedEvent];
  }

  handle(domainEvent: DomainEvent): void | Promise<void> {
    this.controller.start(domainEvent.aggregateId);
  }
}

