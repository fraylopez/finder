/* eslint-disable @typescript-eslint/no-misused-promises */
import { Application } from "express";
import { CardPutController } from "../controllers/CardPutController";
import { container } from "../ioc/installer";

export const register = (app: Application) => {
  const cardPutController = container.get(CardPutController);
  app.put('/card/:id', cardPutController.request.bind(cardPutController));

};
