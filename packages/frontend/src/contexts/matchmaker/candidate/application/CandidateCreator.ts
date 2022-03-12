import { EventBus } from "../../../_shared/domain/EventBus";
import { Candidate } from "../domain/Candidate";
import { CandidateRepository } from "../domain/CandidateRepository";

export class CandidateCreator {
  constructor(
    private readonly candidateRepository: CandidateRepository,
    private readonly eventBus: EventBus,
  ) { }
  async create() {
    const candidate = Candidate.create();
    await this.candidateRepository.add(candidate);
    await this.eventBus.publish(candidate.pullDomainEvents());
  }

}
