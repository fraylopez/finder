import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { inject, injectable } from "inversify";
import { CandidateCreator } from "../../../../contexts/matchmaker/candidate/application/add/CandidateCreator";
import { Controller } from './Controller';

@injectable()
export class CandidatePutController implements Controller {
  constructor(@inject(CandidateCreator) private readonly creator: CandidateCreator) { }

  async run(req: Request, res: Response) {
    const id: string = req.params.uid;
    await this.creator.create({
      id,
    });

    res.header('Access-Control-Allow-Origin', '*');
    res.status(httpStatus.OK).send();
  }
}
