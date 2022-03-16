import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { ChatCreator } from "../../../contexts/backoffice/chat/application/ChatCreator";
import { ExpressController } from "../../_core/controllers/ExpressController";

@injectable()
export class ConversationPostController extends ExpressController {
  constructor(@inject(ChatCreator) private readonly creator: ChatCreator) {
    super();
  }

  protected run(req: Request, _res: Response) {
    const id: string = req.params.id;
    return this.creator.create({ id });
  }
}
