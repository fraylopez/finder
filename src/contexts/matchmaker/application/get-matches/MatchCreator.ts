import { inject, injectable } from "inversify";
import { types } from "../../../../apps/matchmaker/backend/ioc/types";
import { Match } from "../../domain/Match";
import { MatchRepository } from "../../domain/MatchRepository";

type Params = {
  id: string;
};

@injectable()
export class MatchCreator {
  constructor(@inject(types.MatchRepository) private repository: MatchRepository) { }

  async run({ id }: Params) {
    const course = Match.create(id);
    await this.repository.insert(course);
  }
}
