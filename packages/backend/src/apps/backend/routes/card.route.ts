/* eslint-disable @typescript-eslint/no-misused-promises */
import { Application } from "express";
import { CardGetController } from '../controllers/CardGetController';
import { CardPutController } from "../controllers/CardPutController";
import { container } from "../ioc/installer";

export const register = (app: Application) => {
  const cardsGetController = container.get(CardGetController);
  app.get('/card', cardsGetController.request.bind(cardsGetController));

  const cardPutController = container.get(CardPutController);
  app.put('/card/:id', cardPutController.request.bind(cardPutController));

};
