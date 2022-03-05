import { Express } from 'express';
import StatusGetController from "../controllers/StatusGetController";
import StatusController from '../controllers/StatusGetController';
import { container } from "../ioc/installer";

export const register = (app: Express) => {
  const controller: StatusController = container.get(StatusGetController);
  app.get('/status', controller.run.bind(controller));
};
