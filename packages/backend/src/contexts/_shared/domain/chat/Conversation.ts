import assert from "assert";
import { ConversationItem } from "./ConversationItem";
import { ConversationLine } from "./ConversationLine";
import { DefaultLines } from "./DefaultLines";

interface Params {
  id: string;
}
interface Primitives {
  id: string;
  cursor: string;
}

export class Conversation implements ConversationItem {
  static readonly START_ID = "start";
  private items: Map<string, { item: ConversationItem, next: ConversationItem[]; }>;
  private cursor?: string;
  constructor(private id: string) {
    this.items = new Map();
  }

  static create({ id }: Params) {
    const conversation = new Conversation(id);
    return conversation;
  }

  getId(): string {
    return this.id;
  }
  getValue(): string {
    return this.getCurrentNode().getValue();
  }
  getCurrentNode(): ConversationItem {
    return this.items.get(this.getCursor())?.item || ConversationLine.fromLine(DefaultLines.UNKNOWN);
  }
  getNext(): ConversationItem[] {
    return this.items.get(this.getCurrentNode().getId())!.next;
  }

  addNode(node: ConversationItem, next: ConversationItem | ConversationItem[] = []) {
    const _next = Array.isArray(next) ? next : [next];
    this.items.set(node.getId(), { item: node, next: _next });
  }

  getCursor(): string {
    if (!this.cursor) {
      assert(this.items.size);
      this.cursor = Array.from(this.items.values())[0].item.getId();
    }
    return this.cursor;
  }

  listen(next: string) {
    if (this.nodeExists(next)) {
      this.cursor = next;
    }
    return this;
  }

  setCursor(cursor: string) {
    this.cursor = cursor;
  }
  restart() {
    this.cursor = undefined;
  }

  toPrimitives() {
    return {
      id: this.id,
      cursor: this.getCursor(),
    };
  }
  setPrimitives({ id, cursor }: Primitives) {
    this.id = id;
    this.cursor = cursor;
  }

  private nodeExists(id: string) {
    return this.items.get(id);
  }
}
