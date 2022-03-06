import { Application } from "express";
import { CandidatePutController } from "../controllers/CandidatePutController";
import { SwipePutController } from "../controllers/SwipePutController";
import { container } from "../ioc/installer";

export const register = (app: Application) => {
  const candidatePutController = container.get(CandidatePutController);
  app.put('/candidate/:uid', candidatePutController.run.bind(candidatePutController));

  const swipePutController = container.get(SwipePutController);
  app.put('/candidate/:uid/swipe/:matchId', swipePutController.run.bind(swipePutController));
};
