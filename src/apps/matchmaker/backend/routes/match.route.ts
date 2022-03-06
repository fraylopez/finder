import { Application } from "express";
import { MatchGetController as MatchesGetController } from '../controllers/MatchGetController';
import { MatchPutController } from "../controllers/MatchPutController";
import { container } from "../ioc/installer";

export const register = (app: Application) => {
  const matchesGetController = container.get(MatchesGetController);
  app.get('/match', matchesGetController.run.bind(matchesGetController));

  const matchesPutController = container.get(MatchPutController);
  app.put('/match/:id', matchesPutController.run.bind(matchesPutController));

};
