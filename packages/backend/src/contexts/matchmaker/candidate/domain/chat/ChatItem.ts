import { ConversationItem } from "../../../../_shared/domain/chat/ConversationItem";

export interface ChatItem {
  current: ConversationItem;
  next: ConversationItem[];
}
