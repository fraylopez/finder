import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/matchmaker/backend/ioc/types";
import { MatchRepository } from "../../domain/MatchRepository";
import { MatchesResponse } from "./MatchesResponse";

@injectable()
export class MatchFinder {
  constructor(@inject(types.MatchRepository) private repository: MatchRepository) { }

  async run() {
    const matches = await this.repository.searchAll();
    return new MatchesResponse(matches);
  }
}
