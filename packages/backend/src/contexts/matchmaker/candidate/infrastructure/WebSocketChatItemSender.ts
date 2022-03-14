import { inject, injectable } from "inversify";
import { types } from "../../../../apps/matchmaker/ioc/types";
import { WebSocketServer } from "../../../_core/infrastructure/WebSocketServer";
import { ChatItem } from "../domain/chat/ChatItem";
import { ChatItemSender } from "../domain/ConversationItemSender";

@injectable()
export class WebSocketChatItemSender implements ChatItemSender {
  constructor(@inject(types.WebSocketServer) private readonly websocketServer: WebSocketServer) { }

  send(uid: string, conversationItem: ChatItem): void {
    this.websocketServer.emit(
      uid,
      conversationItem.current.getValue(),
      {
        next: conversationItem.next
          .map(i => ({
            id: i.getId(),
            text: i.getValue(),
          }))
      }
    );
  }
}
