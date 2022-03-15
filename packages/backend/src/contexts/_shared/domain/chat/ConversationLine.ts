import { Line } from "./Line";
import { ConversationItem } from "./ConversationItem";

export class ConversationLine implements ConversationItem {
  private next: ConversationLine[];
  constructor(private readonly line: Line) {
    this.next = [];
  }
  static fromLine(line: Line) {
    return new ConversationLine(line);
  }

  static fromPrimitives(primitives: any) {
    const line = new ConversationLine(Line.fromPrimitives(primitives.line));
    line.next = primitives.next.map((n: any) => ConversationLine.fromPrimitives(n));
    return line;
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

  addNext(item: ConversationLine): void {
    this.next.push(item);
  }

  getNext(): ConversationLine[] {
    return this.next;
  }

  toPrimitives(): object {
    return {
      line: this.line.toPrimitives(),
      next: this.next.map(n => n.toPrimitives())
    };
  }


}
