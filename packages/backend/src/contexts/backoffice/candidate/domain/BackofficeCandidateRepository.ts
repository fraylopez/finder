import { Uuid } from "../../../_core/domain/value-object/Uuid";
import { BackofficeCandidate } from "./BackofficeCandidate";

export interface BackofficeCandidateRepository {
  find(id: Uuid): Promise<BackofficeCandidate | null>;
  findAll(): Promise<BackofficeCandidate[]>;
}