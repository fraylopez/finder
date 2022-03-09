import { Candidate } from "../domain/Candidate";
import { CandidateRepository } from "../domain/CandidateRepository";

export class CandidateCreator {
  constructor(private readonly candidateRepository: CandidateRepository) { }
  async create() {
    const candidate = Candidate.create();
    await this.candidateRepository.add(candidate);
  }

}
