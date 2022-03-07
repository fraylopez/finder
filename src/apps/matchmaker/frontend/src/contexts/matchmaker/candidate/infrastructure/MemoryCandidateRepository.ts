import { Candidate } from "../domain/Candidate";
import { CandidateRepository } from "../domain/CandidateRepository";

export class MemoryCandidateRepository implements CandidateRepository {
  private candidate: Candidate | null;
  constructor() {
    this.candidate = null;
  }
  add(candidate: Candidate): Promise<void> {
    this.candidate = candidate;
    return Promise.resolve();
  }

  get(): Promise<Candidate | null> {
    return Promise.resolve(this.candidate);
  }

}