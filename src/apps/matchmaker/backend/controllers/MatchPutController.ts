import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { inject, injectable } from "inversify";
import { MatchCreator } from "../../../../contexts/matchmaker/application/get-matches/MatchCreator";
import { Controller } from './Controller';

@injectable()
export class MatchPutController implements Controller {
  constructor(@inject(MatchCreator) private readonly creator: MatchCreator) { }

  async run(req: Request, res: Response) {
    const id: string = req.params.id;
    const title: string = req.body.title;
    const imageUrl: string = req.body.imageUrl;
    await this.creator.run({ id, title, imageUrl });

    res.header('Access-Control-Allow-Origin', '*');
    res.status(httpStatus.OK).send();
  }
}
