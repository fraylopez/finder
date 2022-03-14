import { DomainEvent } from "../../../_core/domain/DomainEvent";
import { DomainEventClass } from "../../../_core/domain/DomainEventClass";
import { CandidateCreatedEvent } from "../domain/CandidateCreatedEvent";
import { EventHandler } from "../../../_core/domain/EventHandler";
import { MatchUpdater } from "./MatchUpdater";
export class SubscribeToMatchOnCandidateCreatedEventHandler implements EventHandler<CandidateCreatedEvent> {
  constructor(private readonly matchUpdater: MatchUpdater) {
  }
  subscribedTo(): DomainEventClass<DomainEvent>[] {
    return [CandidateCreatedEvent];
  }
  handle(event: CandidateCreatedEvent) {
    this.matchUpdater.register(event.aggregateId);
  }
}