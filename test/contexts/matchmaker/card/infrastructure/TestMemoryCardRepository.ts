import { MemoryCardRepository } from "../../../../../src/contexts/matchmaker/card/infrastructure/MemoryMatchRepository";
export class TestMemoryCardRepository extends MemoryCardRepository {
  removeAll() {
    this.cards = [];
  }
}