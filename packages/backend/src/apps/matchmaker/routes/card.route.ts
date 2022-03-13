/* eslint-disable @typescript-eslint/no-misused-promises */
import { Application } from "express";
import { CardGetController } from '../controllers/CardGetController';
import { container } from "../ioc/installer";

export const register = (app: Application) => {
  const cardsGetController = container.get(CardGetController);
  app.get('/card', cardsGetController.request.bind(cardsGetController));

};
