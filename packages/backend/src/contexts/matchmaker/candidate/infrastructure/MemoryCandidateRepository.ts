import { injectable } from "inversify";
import { Uuid } from "../../../_core/domain/value-object/Uuid";
import { MemoryRepository } from "../../../_core/infrastructure/persistence/memory/MemoryReposirtory";
import { Candidate } from "../domain/Candidate";
import { CandidateRepository } from "../domain/CandidateRepository";

@injectable()
export class MemoryCandidateRepository extends MemoryRepository<Candidate> implements CandidateRepository {

  add(candidate: Candidate): Promise<void> {
    return this.persist(candidate.id.toString(), candidate);
  }
  find(id: Uuid): Promise<Candidate | null> {
    return this.findOne(id.toString(), c => c.id.toString());
  }

  async update(candidate: Candidate): Promise<void> {
    await this.updateOne(candidate.id.toString(), candidate, c => c.id.toString());
  }
}