export interface ConversationItem {
  getFrom(): string;
  getId(): string;
  getValue(): string;
  getCurrentNode(): ConversationItem;
  getNext(): ConversationItem[];
  addNext(item: ConversationItem): void;
}
