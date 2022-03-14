import { BackofficeCandidate } from "../../../../src/contexts/backoffice/candidate/domain/BackofficeCandidate";
import { MongoBackofficeCandidateRepository } from "../../../../src/contexts/backoffice/candidate/infrastructure/MongoBackofficeCandidateRepository";

export class MongoBackofficeCandidateTestRepositroy extends MongoBackofficeCandidateRepository {
  async add(candidate: BackofficeCandidate) {
    await this.persist(candidate.id.toString(), candidate);
  }
}