/* eslint-disable @typescript-eslint/no-misused-promises */
import { Application } from "express";
import { AllCandidatesGetController } from "../controllers/AllCandidatesGetController";
import { CandidateGetController } from "../controllers/CandidateGetController";
import { container } from "../ioc/installer";

export const register = (app: Application) => {
  const allCandidatesGetController = container.get(AllCandidatesGetController);
  app.get('/candidate', allCandidatesGetController.request.bind(allCandidatesGetController));

  const candidateGetController = container.get(CandidateGetController);
  app.get('/candidate/:uid', candidateGetController.request.bind(candidateGetController));
};
