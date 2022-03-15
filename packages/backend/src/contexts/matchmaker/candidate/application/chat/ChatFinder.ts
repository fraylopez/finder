import assert from "assert";
import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/matchmaker/ioc/types";
import { Uuid } from "../../../../_core/domain/value-object/Uuid";
import { CandidateRepository } from "../../domain/CandidateRepository";
import { UnknownCandidateError } from "../../domain/errors/UnknownCandidateError";

@injectable()
export class ChatFinder {
  constructor(
    @inject(types.CandidateRepository) private readonly candidateRepository: CandidateRepository
  ) { }

  async find(uid: string) {
    const candidate = await this.candidateRepository.find(new Uuid(uid));
    assert(candidate, new UnknownCandidateError(uid));
    return candidate.getChat();
  }
}
