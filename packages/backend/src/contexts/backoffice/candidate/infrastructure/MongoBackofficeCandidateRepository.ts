import { injectable } from "inversify";
import { Uuid } from "../../../_core/domain/value-object/Uuid";
import { MongoRepository } from "../../../_core/infrastructure/persistence/mongo/MongoRepository";
import { BackofficeCandidate } from "../domain/BackofficeCandidate";
import { BackofficeCandidateRepository } from "../domain/BackofficeCandidateRepository";

@injectable()
export class MongoBackofficeCandidateRepository extends MongoRepository<BackofficeCandidate> implements BackofficeCandidateRepository {
  protected moduleName(): string {
    return "candidate";
  }

  find(id: Uuid): Promise<BackofficeCandidate | null> {
    return this.findOne(id.toString());
  }
  async findAll(): Promise<BackofficeCandidate[]> {
    const docs = await this.findMany();
    return docs.map(doc => BackofficeCandidate.fromPrimitives({ ...doc, id: new Uuid(doc._id) }));
  }
}