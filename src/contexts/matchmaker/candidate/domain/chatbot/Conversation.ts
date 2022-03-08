import assert from "assert";
import { UnknownConversationNode } from "../errors/UnknownConversationNode";
import { ConversationItem } from "./ConversationItem";
import { ConversationLine } from "./ConversationLine";
import { DefaultLines } from "./DefaultLines";

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
  setNext(nodeId: string, next: ConversationItem | ConversationItem[]): ConversationItem[] {
    let _next = Array.isArray(next) ? next : [next];
    return this.items.get(nodeId)!.next = _next;
  }

  addNode(node: ConversationItem, next: ConversationItem | ConversationItem[] = []) {
    let _next = Array.isArray(next) ? next : [next];
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
    assert(this.items.get(next), new UnknownConversationNode());
    this.cursor = next || this.getCursor();
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
}
