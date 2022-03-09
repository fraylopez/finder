import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { CardCreator } from "../../../contexts/matchmaker/card/application/get-cards/CardCreator";
import { Controller } from './Controller';

@injectable()
export class CardPutController extends Controller {
  constructor(@inject(CardCreator) private readonly creator: CardCreator) {
    super();
  }

  protected run(req: Request, _res: Response) {
    const id: string = req.params.id;
    const title: string = req.body.title;
    const score: number = req.body.score;
    const imageUrl: string = req.body.imageUrl;
    return this.creator.run({ id, title, score, imageUrl });
  }
}
