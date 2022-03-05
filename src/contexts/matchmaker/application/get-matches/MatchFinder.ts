import { inject, injectable } from "inversify";
import { types } from "../../../../apps/matchmaker/backend/ioc/types";
import { MatchRepository } from "../../domain/MatchRepository";
import { MatchesResponse } from "./MatchesResponse";

@injectable()
export class MatchFinder {
  constructor(@inject(types.MatchRepository) private coursesRepository: MatchRepository) { }

  async run() {
    const matches = await this.coursesRepository.searchAll();
    return new MatchesResponse(matches);
  }
}
