import { inject, injectable } from "inversify";
import { DomainEventClass } from "../../../../_core/domain/bus/DomainEventClass";
import { EventHandler } from "../../../../_core/domain/bus/EventHandler";
import { CandidateScoreUpdatedEvent } from "../../domain/events/CandidateScoreUpdatedEvent";
import { CandidateEvaluator } from "./CandidateEvaluator";

@injectable()
export class EvaluateOnCandidateScoreUpdatedEvent implements EventHandler {
  constructor(@inject(CandidateEvaluator) private readonly evaluator: CandidateEvaluator) { }
  subscribedTo(): DomainEventClass[] {
    return [CandidateScoreUpdatedEvent];
  }
  async handle(domainEvent: CandidateScoreUpdatedEvent): Promise<void> {
    await this.evaluator.evaluate({
      uid: domainEvent.aggregateId,
    });
  }

}