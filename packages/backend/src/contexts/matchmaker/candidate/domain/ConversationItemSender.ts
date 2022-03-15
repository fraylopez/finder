import { ConversationItem } from "../../../_shared/domain/chat/ConversationItem";

export interface ChatItemSender {
  send(uid: string, conversationLine: ConversationItem): void;
}
