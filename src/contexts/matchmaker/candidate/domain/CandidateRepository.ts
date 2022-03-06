import { Uuid } from "../../../_shared/domain/value-object/Uuid";
import { Candidate } from "./Candidate";

export interface CandidateRepository {
  find(id: Uuid): Promise<Candidate | null>;
  add(candidate: Candidate): Promise<void>;
}