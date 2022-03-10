import { injectable } from "inversify";
import { Nullable } from "../../../_shared/domain/Nullable";
import { Uuid } from "../../../_shared/domain/value-object/Uuid";
import { globalConfig } from "../../../_shared/infrastructure/globalConfig";
import { MongoConfig } from "../../../_shared/infrastructure/persistence/mongo/MongoConfig";
import { MongoRepository } from "../../../_shared/infrastructure/persistence/mongo/MongoRepository";
import { Candidate } from "../domain/Candidate";
import { CandidateRepository } from "../domain/CandidateRepository";

@injectable()
export class MongoCandidateRepository extends MongoRepository<Candidate> implements CandidateRepository {
  async add(candidate: Candidate): Promise<void> {
    await this.persist(candidate.id.toString(), candidate);
  }

  async find(id: Uuid): Promise<Nullable<Candidate>> {
    const doc = await this.findOne(id.toString());
    return doc ? Candidate.fromPrimitives({ ...doc, id: new Uuid(doc._id) }) : null;
  }

  async update(candidate: Candidate): Promise<void> {
    await this.persist(candidate.id.toString(), candidate);
  }

  protected moduleName(): string {
    return "candiate";
  }
  protected config(): MongoConfig {
    return globalConfig.mongo;
  }
}