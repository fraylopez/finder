import { DomainEvent } from "../../../_core/domain/DomainEvent";
import { DomainEventClass } from "../../../_core/domain/DomainEventClass";
import { CandidateCreatedEvent } from "../domain/CandidateCreatedEvent";
import { EventHandler } from "../../../_core/domain/EventHandler";
import { WebSocketService } from "../domain/WebSocketService";
export class ConnectUpdateServiceOnCandidateCreatedEventHandler implements EventHandler<CandidateCreatedEvent> {
  constructor(private readonly updateService: WebSocketService) {
  }
  subscribedTo(): DomainEventClass<DomainEvent>[] {
    return [CandidateCreatedEvent];
  }
  handle(event: CandidateCreatedEvent) {
    this.updateService.connect(event.aggregateId);
  }
}