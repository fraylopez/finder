import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { BackofficeCandidateFinder } from "../../../contexts/backoffice/candidate/application/find/BackofficeCandidateFinder";
import { BackofficeCandidate } from "../../../contexts/backoffice/candidate/domain/BackofficeCandidate";
import { ExpressController } from "../../_core/controllers/ExpressController";

@injectable()
export class CandidateGetController extends ExpressController {
  constructor(@inject(BackofficeCandidateFinder) private readonly finder: BackofficeCandidateFinder) {
    super();
  }

  protected async run(req: Request, _res: Response) {
    const uid = req.params.uid;
    const candidate = await this.finder.find({ id: uid });
    return candidate ? this.toResponse(candidate) : null;
  }

  private toResponse(candidate: BackofficeCandidate) {
    return {
      id: candidate.id.toString(),
      score: candidate.score,
    };
  }
}


