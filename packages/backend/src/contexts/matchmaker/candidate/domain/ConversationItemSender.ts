import { ChatItem } from "./chatbot/ChatItem";

export interface ChatItemSender {
  send(uid: string, conversationItem: ChatItem): void;
}
