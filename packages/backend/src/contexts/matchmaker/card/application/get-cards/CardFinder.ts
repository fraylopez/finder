import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/backend/ioc/types";
import { CardRepository } from "../../domain/CardRepository";
import { CardsResponse } from "./CardsResponse";

@injectable()
export class CardFinder {
  constructor(@inject(types.CardRepository) private repository: CardRepository) { }

  async run() {
    const cards = await this.repository.searchAll();
    return new CardsResponse(cards);
  }
}
