import { injectable } from "inversify";
import { Uuid } from "../../../_core/domain/value-object/Uuid";
import { Candidate } from "../domain/Candidate";
import { CandidateRepository } from "../domain/CandidateRepository";

@injectable()
export class MemoryCandidateRepository implements CandidateRepository {
  protected candidates: Candidate[];
  constructor() {
    this.candidates = [];
  }

  add(candidate: Candidate): Promise<void> {
    this.candidates.push(candidate);
    return Promise.resolve();
  }
  find(id: Uuid): Promise<Candidate | null> {
    const candidate = this.candidates.find(c => c.id.equals(id));
    return Promise.resolve(candidate || null);
  }

  update(candidate: Candidate): Promise<void> {
    const candidateIndex = this.candidates.findIndex(c => c.id.equals(candidate.id));
    this.candidates[candidateIndex] = candidate;
    return Promise.resolve();
  }
}