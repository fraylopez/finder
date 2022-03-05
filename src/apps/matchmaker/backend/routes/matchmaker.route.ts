import { Application } from "express";
import { MatchGetController as MatchesGetController } from '../controllers/MatchGetController';
import { container } from "../ioc/installer";

export const register = (app: Application) => {
  const matchesGetController = container.get(MatchesGetController);
  app.get('/matchmaker', matchesGetController.run.bind(matchesGetController));
};
