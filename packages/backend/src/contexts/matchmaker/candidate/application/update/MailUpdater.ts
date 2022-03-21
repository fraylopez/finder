import assert from "assert";
import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/matchmaker/ioc/types";
import { coreTypes } from "../../../../../apps/_core/ioc/coreTypes";
import { EventBus } from "../../../../_core/domain/bus/EventBus";
import { Mail } from "../../../../_core/domain/Mail";
import { Uuid } from "../../../../_core/domain/value-object/Uuid";
import { CandidateRepository } from "../../domain/CandidateRepository";
import { UnknownCandidateError } from "../../domain/errors/UnknownCandidateError";

interface Params {
  uid: string,
  mail: string;
}

@injectable()
export class MailUpdater {
  constructor(
    @inject(types.CandidateRepository) private readonly candidateRepository: CandidateRepository,
    @inject(coreTypes.EventBus) private readonly eventBus: EventBus,
  ) { }

  async update({ uid, mail }: Params) {
    const candidate = await this.candidateRepository.find(new Uuid(uid));
    assert(candidate, new UnknownCandidateError(uid));
    candidate.setMail(new Mail(mail));
    await this.candidateRepository.update(candidate);
    await this.eventBus.publish(candidate.pullDomainEvents());
  }
}