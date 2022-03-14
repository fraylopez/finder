import { inject, injectable } from "inversify";
import { sharedTypes } from "../../../../../apps/_shared/ioc/sharedTypes";
import { CardRepository } from "../../../../_shared/domain/card/CardRepository";
import { CardsResponse } from "./CardsResponse";

@injectable()
export class CardFinder {
  constructor(@inject(sharedTypes.CardRepository) private repository: CardRepository) { }

  async run() {
    const cards = await this.repository.searchAll();
    return new CardsResponse(cards);
  }
}
