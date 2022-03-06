import { MemoryMatchRepository } from "../../../../src/contexts/matchmaker/infrastructure/MemoryMatchRepository";
export class TestMemoryMatchRepository extends MemoryMatchRepository {
  removeAll() {
    this.matches = [];
  }
}