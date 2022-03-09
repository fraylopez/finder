import { ConversationItem } from "./ConversationItem";

export interface ChatItem {
  current: ConversationItem;
  next: ConversationItem[];
}
