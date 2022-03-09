import { CandidateRepository } from "../domain/CandidateRepository";

export class CandidateFinder {
  constructor(private readonly candidateRepository: CandidateRepository) { }
  async get() {
    return this.candidateRepository.get();
  }
}
