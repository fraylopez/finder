import assert from "assert";
import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/backend/ioc/types";
import { EventBus } from "../../../../_shared/domain/bus/EventBus";
import { Mail } from "../../../../_shared/domain/Mail";
import { Uuid } from "../../../../_shared/domain/value-object/Uuid";
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
    @inject(types.EventBus) private readonly eventBus: EventBus,
  ) { }

  async update({ uid, mail }: Params) {
    const candidate = await this.candidateRepository.find(new Uuid(uid));
    assert(candidate, new UnknownCandidateError(uid));
    candidate.setMail(new Mail(mail));
    await this.eventBus.publish(candidate.pullDomainEvents());
  }
}