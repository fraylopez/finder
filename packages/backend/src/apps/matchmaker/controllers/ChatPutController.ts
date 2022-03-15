import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { ChatController } from "../../../contexts/matchmaker/candidate/application/chat/ChatController";
import { CandidateIsNotMatchError } from "../../../contexts/matchmaker/candidate/domain/errors/CandidateIsNotMatchError";
import { UnknownCandidateError } from "../../../contexts/matchmaker/candidate/domain/errors/UnknownCandidateError";
import { Controller } from '../../_core/controllers/Controller';

@injectable()
export class ChatPutController extends Controller {
  constructor(@inject(ChatController) private readonly controller: ChatController) {
    super();
    this.addHandledError(UnknownCandidateError, 404);
    this.addHandledError(CandidateIsNotMatchError, 403);
  }

  protected async run(req: Request, _res: Response) {
    const uid: string = req.params.uid;
    const responseId: string = req.body.responseId;
    await this.controller.talk({
      uid,
      responseId,
    });

  }
}
