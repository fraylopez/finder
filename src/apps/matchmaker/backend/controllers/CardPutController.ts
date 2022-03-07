import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { inject, injectable } from "inversify";
import { CardCreator } from "../../../../contexts/matchmaker/card/application/get-cards/CardCreator";
import { Controller } from './Controller';

@injectable()
export class CardPutController implements Controller {
  constructor(@inject(CardCreator) private readonly creator: CardCreator) { }

  async run(req: Request, res: Response) {
    const id: string = req.params.id;
    const title: string = req.body.title;
    const score: number = req.body.score;
    const imageUrl: string = req.body.imageUrl;
    await this.creator.run({ id, title, score, imageUrl });

    res.header('Access-Control-Allow-Origin', '*');
    res.status(httpStatus.OK).send();
  }
}
