import { Candidate } from "../domain/Candidate";
import { CandidateRepository } from "../domain/CandidateRepository";
import { HttpCandidateRepository } from "./HttpCandidateRepository";
import { MemoryCandidateRepository } from "./MemoryCandidateRepository";

export class CompositeCandidateRepository implements CandidateRepository {
  private httpRepository: CandidateRepository;
  private memoryRepository: MemoryCandidateRepository;
  constructor(baseUrl: string) {
    this.httpRepository = new HttpCandidateRepository(baseUrl);
    this.memoryRepository = new MemoryCandidateRepository();
  }
  async add(candidate: Candidate): Promise<void> {
    await this.memoryRepository.add(candidate);
    await this.httpRepository.add(candidate);
  }

  get(): Promise<Candidate | null> {
    return this.memoryRepository.get();
  }

}