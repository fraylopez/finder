import { Application } from "express";
import { MatchGetController as MatchesGetController } from '../controllers/MatchGetController';
import { MatchPutController } from "../controllers/MatchPutController";
import { container } from "../ioc/installer";

export const register = (app: Application) => {
  const matchesGetController = container.get(MatchesGetController);
  app.get('/matchmaker', matchesGetController.run.bind(matchesGetController));

  const matchesPutController = container.get(MatchPutController);
  app.put('/matchmaker/:id', matchesPutController.run.bind(matchesPutController));
};
