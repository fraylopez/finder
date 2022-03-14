import { DomainEvent } from "../../../_core/domain/DomainEvent";
import { DomainEventClass } from "../../../_core/domain/DomainEventClass";
import { EventHandler } from "../../../_core/domain/EventHandler";
import { CandidateCreatedEvent } from "../../candidate/domain/CandidateCreatedEvent";
import { ChatUpdater } from "./ChatUpdater";

export class SubscribeToChatMessageOnCandidateCreatedEventHandler implements EventHandler<CandidateCreatedEvent> {
  constructor(private readonly updater: ChatUpdater) {
  }
  subscribedTo(): DomainEventClass<DomainEvent>[] {
    return [CandidateCreatedEvent];
  }
  handle(event: CandidateCreatedEvent) {
    this.updater.register(event.aggregateId);
  }
}