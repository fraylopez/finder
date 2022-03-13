import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/matchmaker/ioc/types";
import { CardRepository } from "../../../../_shared/domain/card/CardRepository";
import { CardsResponse } from "./CardsResponse";

@injectable()
export class CardFinder {
  constructor(@inject(types.CardRepository) private repository: CardRepository) { }

  async run() {
    const cards = await this.repository.searchAll();
    return new CardsResponse(cards);
  }
}
