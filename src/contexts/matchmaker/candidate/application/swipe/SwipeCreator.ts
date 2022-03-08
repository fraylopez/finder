import assert from "assert";
import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/matchmaker/backend/ioc/types";
import { EventBus } from "../../../../_shared/domain/bus/EventBus";
import { Uuid } from "../../../../_shared/domain/value-object/Uuid";
import { CardRepository } from "../../../card/domain/CardRepository";
import { UnknownCardError } from "../../../card/domain/errors/UnknownCardError";
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
    @inject(types.CardRepository) private readonly cardRepository: CardRepository, //TODO: decouple through queryBus
    @inject(types.EventBus) private readonly eventBus: EventBus,
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
        card.score
      )
    );
    this.eventBus.publish(candidate.pullDomainEvents());
  }
}