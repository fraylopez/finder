import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/matchmaker/ioc/types";
import { Uuid } from "../../../../_core/domain/value-object/Uuid";
import { BackofficeCandidateRepository } from "../../domain/BackofficeCandidateRepository";

type Params = {
  id: string;
};

@injectable()
export class BackofficeCandidateFinder {
  constructor(
    @inject(types.CandidateRepository) private repository: BackofficeCandidateRepository,
  ) { }

  async find({ id }: Params) {
    return this.repository.find(new Uuid(id));
  }
  async findAll() {
    return this.repository.findAll();
  }
}