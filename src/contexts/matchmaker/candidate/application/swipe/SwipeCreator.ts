import assert from "assert";
import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/matchmaker/backend/ioc/types";
import { EventBus } from "../../../../_shared/domain/EventBus";
import { Uuid } from "../../../../_shared/domain/value-object/Uuid";
import { CardFinder } from "../../../card/application/get-cards/CardFinder";
import { CardRepository } from "../../../card/domain/CardRepository";
import { CandidateRepository } from "../../domain/CandidateRepository";
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
    @inject(types.CardRepository) private readonly cardRepository: CardRepository,
    @inject(types.EventBus) private readonly eventBus: EventBus,
  ) { }

  async swipe({ uid, cardId, right }: Params) {
    const candidate = await this.candidateRepository.find(new Uuid(uid));
    const card = await this.cardRepository.find(new Uuid(cardId));
    assert(candidate, "Unknown candidate");
    assert(card, "Unknown card");
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