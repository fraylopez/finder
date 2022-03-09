import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { SwipeCreator } from "../../../contexts/matchmaker/candidate/application/swipe/SwipeCreator";
import { UnknownCandidateError } from "../../../contexts/matchmaker/candidate/domain/errors/UnknownCandidateError";
import { UnknownCardError } from "../../../contexts/matchmaker/card/domain/errors/UnknownCardError";
import { Controller } from './Controller';

@injectable()
export class SwipePutController extends Controller {
  constructor(@inject(SwipeCreator) private readonly creator: SwipeCreator) {
    super();
    this.addHandledError(UnknownCandidateError, 404);
    this.addHandledError(UnknownCardError, 404);

  }

  protected async run(req: Request, res: Response) {
    const uid: string = req.params.uid;
    const cardId: string = req.params.cardId;
    const right: boolean = req.body.right;
    await this.creator.swipe({
      cardId,
      uid,
      right,
    });
  }
}
