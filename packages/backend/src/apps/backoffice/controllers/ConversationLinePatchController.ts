import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { ChatUpdater } from "../../../contexts/backoffice/chat/application/ChatUpdater";
import { ExpressController } from "../../_core/controllers/ExpressController";

@injectable()
export class ConversationLinePatchController extends ExpressController {
  constructor(@inject(ChatUpdater) private readonly updater: ChatUpdater) {
    super();
  }

  protected run(req: Request, _res: Response) {
    const id: string = req.params.id;
    const value: string = req.body.value;
    const from: string = req.body.from;
    const fromNodeId: string = req.body.fromNodeId;
    return this.updater.addLine({ id, value, fromNodeId, from });
  }
}

