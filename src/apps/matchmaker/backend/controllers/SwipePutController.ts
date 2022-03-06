import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { inject, injectable } from "inversify";
import { SwipeCreator } from "../../../../contexts/matchmaker/candidate/application/swipe/SwipeCreator";
import { Controller } from './Controller';

@injectable()
export class SwipePutController implements Controller {
  constructor(@inject(SwipeCreator) private readonly creator: SwipeCreator) { }

  async run(req: Request, res: Response) {
    const uid: string = req.params.uid;
    const matchId: string = req.params.matchId;
    const right: boolean = req.body.right;
    await this.creator.swipe({
      matchId,
      uid,
      right,
    }
    );

    res.header('Access-Control-Allow-Origin', '*');
    res.status(httpStatus.OK).send();
  }
}
