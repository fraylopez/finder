import { inject, injectable } from "inversify";
import { types } from "../../../../apps/matchmaker/ioc/types";
import { WebSocketServer } from "../../../_core/infrastructure/WebSocketServer";
import { ConversationItem } from "../../../_shared/domain/chat/ConversationItem";
import { ChatItemSender } from "../domain/ConversationItemSender";

@injectable()
export class WebSocketChatItemSender implements ChatItemSender {
  constructor(@inject(types.WebSocketServer) private readonly websocketServer: WebSocketServer) { }

  send(uid: string, conversationItem: ConversationItem): void {
    this.websocketServer.emit(
      uid,
      "chat.message",
      {
        current: { id: conversationItem.getId(), value: conversationItem.getValue(), from: conversationItem.getFrom() },
        next: conversationItem.getNext()
          .map(i => ({
            id: i.getId(),
            value: i.getValue(),
          }))
      }
    );
  }
}
