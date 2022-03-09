import { inject, injectable } from "inversify";
import { types } from "../../../../apps/matchmaker/backend/ioc/types";
import { WebSocketServer } from "../../../_shared/infrastructure/WebSocketServer";
import { ChatItem } from "../domain/chatbot/ChatItem";
import { ChatItemSender } from "../domain/ConversationItemSender";

@injectable()
export class WebSocketChatItemSender implements ChatItemSender {
  constructor(@inject(types.WebSocketServer) private readonly websocketServer: WebSocketServer) { };

  send(conversationItem: ChatItem): void {
    this.websocketServer.emit(
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
