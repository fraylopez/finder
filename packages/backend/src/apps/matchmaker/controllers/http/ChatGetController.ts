import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { ChatFinder } from "../../../../contexts/matchmaker/candidate/application/chat/ChatFinder";
import { Chat } from "../../../../contexts/matchmaker/candidate/domain/chat/Chat";
import { UnknownCandidateError } from "../../../../contexts/matchmaker/candidate/domain/errors/UnknownCandidateError";
import { ExpressController } from "../../../_core/controllers/ExpressController";

@injectable()
export class ChatGetController extends ExpressController {
  constructor(@inject(ChatFinder) private readonly candidateFinder: ChatFinder) {
    super();
    this.addHandledError(UnknownCandidateError, 404);
  }

  protected async run(req: Request, _res: Response) {
    const uid = req.params.uid;
    const chat = await this.candidateFinder.find(uid);
    return this.toResponse(chat);
  }

  private toResponse(chat?: Chat) {
    return {
      path: chat?.getPath(),
      next: chat?.getCurrentNode().getNext().map(n => ({ id: n.getId(), value: n.getValue() }))
    };
  }
}
