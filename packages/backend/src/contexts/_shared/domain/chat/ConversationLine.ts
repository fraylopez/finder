import { Line } from "./Line";
import { ConversationItem } from "./ConversationItem";

export class ConversationLine implements ConversationItem {
  static readonly FROM_COMPANY = "company";
  private next: ConversationLine[];
  constructor(
    private readonly line: Line,
    private readonly from: string = ConversationLine.FROM_COMPANY,
  ) {
    this.next = [];
  }
  static fromLine(line: Line, from: string) {
    return new ConversationLine(line, from);
  }

  static fromPrimitives(primitives: any) {
    const line = new ConversationLine(Line.fromPrimitives(primitives.line), primitives.from);
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

  addNext(item: ConversationLine) {
    this.next.push(item);
    return this;
  }

  getNext(): ConversationLine[] {
    return this.next;
  }

  getFrom() {
    return this.from;
  }

  toPrimitives(): object {
    return {
      line: this.line.toPrimitives(),
      from: this.from,
      next: this.next.map(n => n.toPrimitives())
    };
  }


}
