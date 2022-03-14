import assert from "assert";
import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/matchmaker/ioc/types";
import { coreTypes } from "../../../../../apps/_core/ioc/coreTypes";
import { sharedTypes } from "../../../../../apps/_shared/ioc/sharedTypes";
import { EventBus } from "../../../../_core/domain/bus/EventBus";
import { Uuid } from "../../../../_core/domain/value-object/Uuid";
import { CardRepository } from "../../../../_shared/domain/card/CardRepository";
import { UnknownCardError } from "../../../../_shared/domain/card/errors/UnknownCardError";
import { CandidateRepository } from "../../domain/CandidateRepository";
import { UnknownCandidateError } from "../../domain/errors/UnknownCandidateError";
import { Swipe } from "../../domain/Swipe";

type Params = {
  cardId: string;
  uid: string,
  right: boolean,
};

@injectable()
export class SwipeCreator {
  constructor(
    @inject(types.CandidateRepository) private readonly candidateRepository: CandidateRepository,
    @inject(sharedTypes.CardRepository) private readonly cardRepository: CardRepository, // TODO: decouple through queryBus
    @inject(coreTypes.EventBus) private readonly eventBus: EventBus,
  ) { }

  async swipe({ uid, cardId, right }: Params) {
    const candidate = await this.candidateRepository.find(new Uuid(uid));
    const card = await this.cardRepository.find(new Uuid(cardId));
    assert(candidate, new UnknownCandidateError(uid));
    assert(card, new UnknownCardError(cardId));
    candidate.swipe(
      new Swipe(
        new Uuid(cardId),
        right,
        right ? card.score?.right : card.score?.left
      )
    );
    await this.candidateRepository.update(candidate);
    await this.eventBus.publish(candidate.pullDomainEvents());
  }
}