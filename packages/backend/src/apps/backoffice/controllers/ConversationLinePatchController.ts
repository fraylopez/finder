import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { ChatUpdater } from "../../../contexts/backoffice/chat/application/ChatUpdater";
import { Controller } from "../../_core/controllers/Controller";

@injectable()
export class ConversationLinePatchController extends Controller {
  constructor(@inject(ChatUpdater) private readonly updater: ChatUpdater) {
    super();
  }

  protected run(req: Request, _res: Response) {
    const id: string = req.params.id;
    const value: string = req.body.value;
    const fromNodeId: string = req.body.fromNodeId;
    return this.updater.addLine({ id, value, fromNodeId });
  }
}

