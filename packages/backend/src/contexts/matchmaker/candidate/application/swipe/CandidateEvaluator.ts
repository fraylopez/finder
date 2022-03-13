import assert from "assert";
import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/matchmaker/ioc/types";
import { EventBus } from "../../../../_core/domain/bus/EventBus";
import { Uuid } from "../../../../_core/domain/value-object/Uuid";
import { CandidateRepository } from "../../domain/CandidateRepository";
import { UnknownCandidateError } from "../../domain/errors/UnknownCandidateError";
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
    assert(candidate, new UnknownCandidateError(uid));
    candidate.match(this.candidateEvaluator);
    await this.candidateRepository.update(candidate);
    await this.eventBus.publish(candidate.pullDomainEvents());
  }
}
