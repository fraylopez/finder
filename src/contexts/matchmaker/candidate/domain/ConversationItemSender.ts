import { ChatItem } from "./chatbot/ChatItem";

export interface ChatItemSender {
  send(conversationItem: ChatItem): void;
}
