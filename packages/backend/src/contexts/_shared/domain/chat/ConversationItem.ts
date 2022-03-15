export interface ConversationItem {
  getId(): string;
  getValue(): string;
  getCurrentNode(): ConversationItem;
  getNext(): ConversationItem[];
  addNext(item: ConversationItem): void;
}
