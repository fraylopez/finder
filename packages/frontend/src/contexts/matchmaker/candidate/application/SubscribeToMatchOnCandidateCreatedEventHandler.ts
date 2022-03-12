import { DomainEvent } from "../../../_shared/domain/DomainEvent";
import { DomainEventClass } from "../../../_shared/domain/DomainEventClass";
import { CandidateCreatedEvent } from "../domain/CandidateCreatedEvent";
import { EventHandler } from "../../../_shared/domain/EventHandler";
import { MatchUpdater } from "./MatchUpdater";
export class HandshakeCandidateOnCandidateCreatedEventHandler implements EventHandler<CandidateCreatedEvent> {
  constructor(private readonly matchUpdater: MatchUpdater) {
  }
  subscribedTo(): DomainEventClass<DomainEvent>[] {
    return [CandidateCreatedEvent];
  }
  handle(event: CandidateCreatedEvent) {
    this.matchUpdater.register(event.aggregateId);
  }
}