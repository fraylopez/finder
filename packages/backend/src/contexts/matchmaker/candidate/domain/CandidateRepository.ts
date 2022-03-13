import { Uuid } from "../../../_core/domain/value-object/Uuid";
import { Candidate } from "../../../matchmaker/candidate/domain/Candidate";

export interface CandidateRepository {
  update(candidate: Candidate): Promise<void>;
  find(id: Uuid): Promise<Candidate | null>;
  add(candidate: Candidate): Promise<void>;
}