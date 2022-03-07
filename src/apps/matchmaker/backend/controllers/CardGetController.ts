import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { inject, injectable } from "inversify";
import { CardsResponse } from "../../../../contexts/matchmaker/card/application/get-cards/CardsResponse";
import { CardFinder } from "../../../../contexts/matchmaker/card/application/get-cards/CardFinder";
import { Card } from "../../../../contexts/matchmaker/card/domain/Card";
import { Controller } from './Controller';

@injectable()
export class CardGetController implements Controller {
  constructor(@inject(CardFinder) private readonly cardFinder: CardFinder) { }

  async run(_req: Request, res: Response) {
    const queryResponse: CardsResponse = await this.cardFinder.run();

    res.header('Access-Control-Allow-Origin', '*');
    res.status(httpStatus.OK).send(this.toResponse(queryResponse.cards));
  }


  private toResponse(cards: Array<Card>) {
    return cards.map(card => ({
      id: card.id.toString(),
      title: card.title,
      imageUrl: card.imageUrl,
    }));
  }
}


