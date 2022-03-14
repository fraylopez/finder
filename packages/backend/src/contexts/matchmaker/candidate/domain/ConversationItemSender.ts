import { ChatItem } from "./chat/ChatItem";

export interface ChatItemSender {
  send(uid: string, conversationItem: ChatItem): void;
}
