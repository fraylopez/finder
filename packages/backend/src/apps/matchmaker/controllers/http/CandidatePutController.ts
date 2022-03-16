import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { CandidateCreator } from "../../../../contexts/matchmaker/candidate/application/add/CandidateCreator";
import { ExpressController } from '../../../_core/controllers/ExpressController';

@injectable()
export class CandidatePutController extends ExpressController {
  constructor(@inject(CandidateCreator) private readonly creator: CandidateCreator) {
    super();
  }

  protected async run(req: Request, _res: Response) {
    const id: string = req.params.uid;
    return this.creator.create({
      id,
    });
  }
}
