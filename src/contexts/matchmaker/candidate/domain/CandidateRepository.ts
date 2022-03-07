import { Uuid } from "../../../_shared/domain/value-object/Uuid";
import { Candidate } from "./Candidate";

export interface CandidateRepository {
  update(candidate: Candidate): Promise<void>;
  find(id: Uuid): Promise<Candidate | null>;
  add(candidate: Candidate): Promise<void>;
}