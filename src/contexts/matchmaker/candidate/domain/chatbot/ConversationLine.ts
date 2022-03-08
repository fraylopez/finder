import { Line } from "./Line";
import { ConversationItem } from "./ConversationItem";

export class ConversationLine implements ConversationItem {
  constructor(private readonly line: Line) { }
  static fromLine(line: Line) {
    return new ConversationLine(line);
  }

  getId(): string {
    return this.line.id;
  }
  getValue(): string {
    return this.line.value;
  }
  getCurrentNode(): ConversationLine {
    return this;
  }
  getNext(): ConversationLine[] {
    return [];
  }
}
