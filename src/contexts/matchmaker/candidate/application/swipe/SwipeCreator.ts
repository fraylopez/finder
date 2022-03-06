import assert from "assert";
import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/matchmaker/backend/ioc/types";
import { EventBus } from "../../../../_shared/domain/EventBus";
import { Uuid } from "../../../../_shared/domain/value-object/Uuid";
import { CandidateRepository } from "../../domain/CandidateRepository";
import { Swipe } from "../../domain/Swipe";

type Params = {
  matchId: string;
  uid: string,
  right: boolean,
};

@injectable()
export class SwipeCreator {
  constructor(
    @inject(types.CandidadteRepository) private readonly candidateRepository: CandidateRepository,
    @inject(types.EventBus) private readonly eventBus: EventBus,
  ) { }

  async swipe({ uid, matchId, right }: Params) {
    const candidate = await this.candidateRepository.find(new Uuid(uid));
    assert(candidate, "Unknown candidate");
    candidate.swipe(
      new Swipe(
        new Uuid(uid),
        new Uuid(matchId),
        right
      )
    );
    this.eventBus.publish(candidate.pullDomainEvents());
  }
}