import { CardRepository } from "../../domain/CardRepository";

export class CardFinder {
  constructor(private readonly repository: CardRepository) {/*  */ }
  find() {
    return this.repository.searchAll();
  }
}