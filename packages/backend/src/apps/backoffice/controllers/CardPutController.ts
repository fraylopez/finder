import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { CardCreator } from "../../../contexts/backoffice/card/application/create/CardCreator";
import { ExpressController } from "../../_core/controllers/ExpressController";

@injectable()
export class CardPutController extends ExpressController {
  constructor(@inject(CardCreator) private readonly creator: CardCreator) {
    super();
  }

  protected run(req: Request, _res: Response) {
    const id: string = req.params.id;
    const title: string = req.body.title;
    const score: { left: number, right: number; } = req.body.score;
    const imageUrl: string = req.body.imageUrl;
    return this.creator.run({ id, title, score, imageUrl });
  }
}
