import { inject, injectable } from "inversify";
import { DomainEventClass, DomainEvent } from "../../../../_shared/domain/DomainEvent";
import { EventHandler } from "../../../../_shared/domain/EventHandler";
import { SwipeCreatedEvent } from "../../domain/SwipeCreatedEvent";
import { ChatManager } from "./ChatManager";

@injectable()
export class StartChatOnMatchCreatedEvent implements EventHandler {

  constructor(@inject(ChatManager) private readonly conversationManager: ChatManager) { }

  subscribedTo(): DomainEventClass[] {
    return [SwipeCreatedEvent];
  }

  handle(domainEvent: DomainEvent): void | Promise<void> {
    this.conversationManager.start(domainEvent.aggregateId);
  }
}

