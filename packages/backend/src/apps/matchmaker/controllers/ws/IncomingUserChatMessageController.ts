import { inject, injectable } from "inversify";
import { ChatController } from "../../../../contexts/matchmaker/candidate/application/chat/ChatController";
import { SocketIOController } from "../../../_core/controllers/SocketIOController";

@injectable()
export class IncomingUserChatMessageController extends SocketIOController {
  constructor(@inject(ChatController) private readonly cardFinder: ChatController) {
    super();
  }

  protected async run(message: any) {
    const uid = message.uid;
    const responseId = message.responseId;
    await this.cardFinder.talk({ uid, responseId });
  }
}