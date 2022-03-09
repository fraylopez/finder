import { Candidate } from "./Candidate";

export interface CandidateRepository {
  add(candidate: Candidate): Promise<void>;
  get(): Promise<Candidate | null>;
}
