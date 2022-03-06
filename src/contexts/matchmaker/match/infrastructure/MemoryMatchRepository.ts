import { injectable } from "inversify";
import { MatchTitleMother } from "../../../../../test/contexts/matchmaker/domain/MatchTitleMother";
import { Uuid } from "../../../_shared/domain/value-object/Uuid";
import { Match } from "../domain/Match";
import { MatchRepository } from "../domain/MatchRepository";

@injectable()
export class MemoryMatchRepository implements MatchRepository {
  protected matches: Match[];
  constructor() {
    this.matches = testData;
  }

  insert(match: Match): Promise<void> {
    this.matches.push(match);
    return Promise.resolve();
  }

  searchAll(): Promise<Match[]> {
    return Promise.resolve(this.matches);
  }

}

const testData = [
  Match.create({ id: Uuid.random(), title: MatchTitleMother.random() }),
  Match.create({ id: Uuid.random(), title: MatchTitleMother.random() }),
];