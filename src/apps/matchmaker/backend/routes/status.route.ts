import { Express } from 'express';
import { StatusGetController } from "../controllers/StatusGetController";
import { container } from "../ioc/installer";

export const register = (app: Express) => {
  const controller = container.get(StatusGetController);
  app.get('/status', controller.request.bind(controller));
};
