import { Card } from "../../domain/Card";

export class CardsResponse {
  readonly cards: Array<Card>;

  constructor(cards: Array<Card>) {
    this.cards = cards;
  }
}
