import { Card } from "../../../../_shared/domain/card/Card";

export class CardsResponse {
  readonly cards: Array<Card>;

  constructor(cards: Array<Card>) {
    this.cards = cards;
  }
}
