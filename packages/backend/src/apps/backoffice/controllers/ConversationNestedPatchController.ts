import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { ChatUpdater } from "../../../contexts/backoffice/chat/application/ChatUpdater";
import { Controller } from "../../_core/controllers/Controller";


@injectable()
export class ConversationNestedPatchController extends Controller {
  constructor(@inject(ChatUpdater) private readonly updater: ChatUpdater) {
    super();
  }

  protected run(req: Request, _res: Response) {
    const id: string = req.params.id;
    const linkToConversationId: string = req.body.linkToConversationId;
    const fromNodeId: string = req.body.fromNodeId;
    return this.updater.addNestedConversation({ conversationId: id, linkToConversationId, fromNodeId });
  }
}
