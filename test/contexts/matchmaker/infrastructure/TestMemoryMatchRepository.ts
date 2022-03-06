import { MemoryMatchRepository } from "../../../../src/contexts/matchmaker/match/infrastructure/MemoryMatchRepository";
export class TestMemoryMatchRepository extends MemoryMatchRepository {
  removeAll() {
    this.matches = [];
  }
}