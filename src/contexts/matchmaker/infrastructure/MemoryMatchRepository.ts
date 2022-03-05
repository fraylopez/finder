import { injectable } from "inversify";
import { Match } from "../domain/Match";
import { MatchRepository } from "../domain/MatchRepository";

@injectable()
export class MemoryMatchRepository implements MatchRepository {
  protected matches: Match[];
  constructor() {
    this.matches = [];
  }

  insert(match: Match): Promise<void> {
    this.matches.push(match);
    return Promise.resolve();
  }

  searchAll(): Promise<Match[]> {
    return Promise.resolve(this.matches);
  }

}