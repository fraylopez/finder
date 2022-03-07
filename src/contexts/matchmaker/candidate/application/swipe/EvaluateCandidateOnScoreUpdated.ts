import { inject, injectable } from "inversify";
import { DomainEventClass } from "../../../../_shared/domain/DomainEvent";
import { EventHandler } from "../../../../_shared/domain/EventHandler";
import { CandidateScoreUpdatedEvent } from "../../domain/CandidateScoreUpdatedEvent";
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