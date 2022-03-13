import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { CandidateFinder } from "../../../contexts/backoffice/candidate/application/find/CandidateFinder";
import { BackofficeCandidate } from "../../../contexts/backoffice/candidate/domain/BackofficeCandidate";
import { Controller } from "../../_core/controllers/Controller";

@injectable()
export class AllCandidatesGetController extends Controller {
  constructor(@inject(CandidateFinder) private readonly finder: CandidateFinder) {
    super();
  }

  protected async run(_req: Request, _res: Response) {
    const candidates = await this.finder.findAll();
    return this.toResponse(candidates);
  }

  private toResponse(candidates: Array<BackofficeCandidate>) {
    return candidates.map(candidate => ({
      id: candidate.id.toString(),
      score: candidate.score,
    }));
  }
}


