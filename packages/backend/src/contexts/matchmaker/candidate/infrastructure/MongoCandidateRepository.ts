import { injectable } from "inversify";
import { Nullable } from "../../../_core/domain/Nullable";
import { Uuid } from "../../../_core/domain/value-object/Uuid";
import { MongoRepository } from "../../../_core/infrastructure/persistence/mongo/MongoRepository";
import { Candidate } from "../domain/Candidate";
import { CandidateRepository } from "../domain/CandidateRepository";

@injectable()
export class MongoCandidateRepository extends MongoRepository<Candidate> implements CandidateRepository {
  async add(candidate: Candidate): Promise<void> {
    await this.persist(candidate.id.toString(), candidate);
  }

  async find(id: Uuid): Promise<Nullable<Candidate>> {
    const doc = await this.findOne<any>(id.toString());
    return doc ? Candidate.fromPrimitives({ ...doc, id: doc.id }) : null;
  }

  async update(candidate: Candidate): Promise<void> {
    await this.persist(candidate.id.toString(), candidate);
  }

  protected moduleName(): string {
    return "candiate";
  }
}
