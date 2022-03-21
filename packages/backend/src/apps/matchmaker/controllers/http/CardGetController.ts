import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { CardFinder } from "../../../../contexts/matchmaker/card/application/get-cards/CardFinder";
import { Card } from "../../../../contexts/_shared/domain/card/Card";
import { ExpressController } from "../../../_core/controllers/ExpressController";

@injectable()
export class CardGetController extends ExpressController {
  constructor(@inject(CardFinder) private readonly cardFinder: CardFinder) {
    super();
  }

  protected async run(_req: Request, _res: Response) {
    const cardsResponse = await this.cardFinder.run();
    return this.toResponse(cardsResponse.cards);
  }

  private toResponse(cards: Array<Card>) {
    return cards.map(card => ({
      id: card.id.toString(),
      title: card.title,
      imageUrl: card.imageUrl,
    }));
  }
}



