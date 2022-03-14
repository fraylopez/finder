import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { ChatUpdater } from "../../../contexts/backoffice/chat/application/ChatUpdater";
import { Controller } from "../../_core/controllers/Controller";

@injectable()
export class ConversationPatchController extends Controller {
  constructor(@inject(ChatUpdater) private readonly updater: ChatUpdater) {
    super();
  }

  protected run(req: Request, _res: Response) {
    const id: string = req.params.id;
    return this.updater.update({ id });
  }
}
