import { MemoryCardRepository } from "../../../../../src/contexts/matchmaker/card/infrastructure/MemoryCardRepository";
export class TestMemoryCardRepository extends MemoryCardRepository {
  removeAll() {
    this.cards = [];
  }
}