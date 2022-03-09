import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/backend/ioc/types";
import { EventBus } from "../../../../_shared/domain/bus/EventBus";
import { Uuid } from "../../../../_shared/domain/value-object/Uuid";
import { Candidate } from "../../domain/Candidate";
import { CandidateRepository } from "../../domain/CandidateRepository";

type Params = {
  id: string;
};

@injectable()
export class CandidateCreator {
  constructor(
    @inject(types.CandidateRepository) private repository: CandidateRepository,
    @inject(types.EventBus) private eventBus: EventBus,
  ) { }

  async create({ id }: Params) {
    const candidate = Candidate.create({ id: new Uuid(id) });
    await this.repository.add(candidate);
    await this.eventBus.publish(candidate.pullDomainEvents());
  }
}