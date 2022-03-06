import { MatchRepository } from "../../domain/MatchRepository";

export class MatchFinder {
  constructor(private readonly repository: MatchRepository) {/*  */ }
  find() {
    return this.repository.searchAll();
  }
}