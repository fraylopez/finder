import { inject, injectable } from "inversify";
import { DomainEvent } from "../../../../_core/domain/bus/DomainEvent";
import { DomainEventClass } from "../../../../_core/domain/bus/DomainEventClass";
import { EventHandler } from "../../../../_core/domain/bus/EventHandler";
import { MatchCreatedEvent } from "../../domain/events/MatchCreatedEvent";
import { ChatController } from "./ChatController";

@injectable()
export class StartChatOnMatchCreatedEvent implements EventHandler {

  constructor(@inject(ChatController) private readonly controller: ChatController) { }

  subscribedTo(): DomainEventClass[] {
    return [MatchCreatedEvent];
  }

  async handle(domainEvent: DomainEvent): Promise<void> {
    await this.controller.start(domainEvent.aggregateId);
  }
}

