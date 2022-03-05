import { injectable } from "inversify";
import { Match } from "../domain/Match";
import { MatchRepository } from "../domain/MatchRepository";

@injectable()
export class MemoryMatchRepository implements MatchRepository {
  private readonly matches: Match[];
  constructor() {
    this.matches = [];
  }

  searchAll(): Promise<Match[]> {
    return Promise.resolve(this.matches);
  }

}