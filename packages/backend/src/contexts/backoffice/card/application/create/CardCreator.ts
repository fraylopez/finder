import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/matchmaker/ioc/types";
import { EventBus } from "../../../../_core/domain/bus/EventBus";
import { Uuid } from "../../../../_core/domain/value-object/Uuid";
import { Card } from "../../../../_shared/domain/card/Card";
import { CardRepository } from "../../../../_shared/domain/card/CardRepository";

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
    await this.evetBus.publish(card.pullDomainEvents());
  }
}
