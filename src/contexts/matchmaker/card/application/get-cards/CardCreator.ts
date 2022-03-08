import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/matchmaker/backend/ioc/types";
import { EventBus } from "../../../../_shared/domain/bus/EventBus";
import { Uuid } from "../../../../_shared/domain/value-object/Uuid";
import { Card } from "../../domain/Card";
import { CardRepository } from "../../domain/CardRepository";

type Params = {
  id: string;
  title: string,
  score: number,
  imageUrl?: string,
};

@injectable()
export class CardCreator {
  constructor(
    @inject(types.CardRepository) private repository: CardRepository,
    @inject(types.EventBus) private evetBus: EventBus,
  ) { }

  async run({ id, title, score, imageUrl }: Params) {
    const card = Card.create({ id: new Uuid(id), title, score, imageUrl });
    await this.repository.add(card);
    this.evetBus.publish(card.pullDomainEvents());
  }
}
