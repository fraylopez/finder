import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { inject, injectable } from "inversify";
import { MatchesResponse } from "../../../../contexts/matchmaker/application/get-matches/MatchesResponse";
import { MatchFinder } from "../../../../contexts/matchmaker/application/get-matches/MatchFinder";
import { Match } from "../../../../contexts/matchmaker/domain/Match";
import { Controller } from './Controller';

@injectable()
export class MatchGetController implements Controller {
  constructor(@inject(MatchFinder) private readonly matchFinder: MatchFinder) { }

  async run(_req: Request, res: Response) {
    const queryResponse: MatchesResponse = await this.matchFinder.run();

    res.header('Access-Control-Allow-Origin', '*');
    res.status(httpStatus.OK).send(this.toResponse(queryResponse.matches));
  }


  private toResponse(matches: Array<Match>) {
    return matches.map(match => ({
      id: match.id.toString(),
    }));
  }
}


