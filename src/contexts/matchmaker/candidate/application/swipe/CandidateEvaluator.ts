import assert from "assert";
import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/matchmaker/backend/ioc/types";
import { EventBus } from "../../../../_shared/domain/EventBus";
import { Uuid } from "../../../../_shared/domain/value-object/Uuid";
import { CandidateRepository } from "../../domain/CandidateRepository";
import { MatchEvaluator } from "../../domain/MatchEvaluator";

type Params = {
  uid: string,
};

@injectable()
export class CandidateEvaluator {
  constructor(
    @inject(types.CandidateRepository) private readonly candidateRepository: CandidateRepository,
    @inject(types.MatchEvaluator) private readonly candidateEvaluator: MatchEvaluator,
    @inject(types.EventBus) private readonly eventBus: EventBus,
  ) { }

  async evaluate({ uid }: Params) {
    const candidate = await this.candidateRepository.find(new Uuid(uid));
    assert(candidate, "Unknown candidate");
    candidate.match(this.candidateEvaluator);
    await this.candidateRepository.update(candidate);
    this.eventBus.publish(candidate.pullDomainEvents());
  }
}
