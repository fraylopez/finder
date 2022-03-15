import assert from "assert";
import { AggregateRoot } from "../../../_core/domain/AggregateRoot";
import { ConversationItem } from "./ConversationItem";
import { ConversationLine } from "./ConversationLine";

interface Params {
  id: string;
}
interface Primitives {
  id: string;
  cursor?: string;
  entryPoint?: any;
}

export class Conversation extends AggregateRoot implements ConversationItem {

  static readonly FROM_COMPANY = "company";
  private entryPoint?: ConversationLine;
  private cursor?: string;
  constructor(private id: string) {
    super();
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

  getFirstNode() {
    const first = this.entryPoint;
    return first;
  }

  getCurrentNode(): ConversationItem {
    return this.getNodeById(this.getCursor(), this.getEntryPoint())!;
  }

  getNext(): ConversationItem[] {
    return this.getCurrentNode().getNext();
  }

  getFrom() {
    return this.getCurrentNode().getFrom();
  }

  addNext(item: ConversationItem): void {
    if (!this.entryPoint) {
      assert(item instanceof ConversationLine, "Conversation must start with a line");
      this.entryPoint = item;
      this.setCursor(item.getId());
    }
    else {
      this.getCurrentNode().addNext(item);
    }
  }

  addNodeFrom(node: ConversationItem, fromNodeId: string) {
    const parent = this.getNodeById(fromNodeId, this.getEntryPoint());
    assert(parent, `Unknown origin node ${fromNodeId}`);
    parent.addNext(node);
  }

  getCursor(): string {
    assert(this.cursor, "Conversation never started");
    return this.cursor;
  }

  listen(next: string) {
    if (this.geNextById(next)) {
      this.setCursor(next);
    }
    return this;
  }

  respond() {
    const next = this.getNext();
    assert(next.length <= 1, "Conversation violates listen/respond structure");
    if (next.length) {
      this.setCursor(next[0].getId());
    }
  }

  setCursor(cursor: string) {
    this.cursor = cursor;
  }

  restart() {
    this.setCursor(this.getEntryPoint().getId());
  }

  toPrimitives() {
    return {
      id: this.id,
      cursor: this.cursor,
      entryPoint: this.entryPoint?.toPrimitives()
    };
  }

  setPrimitives({ id, cursor, entryPoint }: Primitives) {
    this.id = id;
    this.cursor = cursor;
    this.entryPoint = entryPoint ? ConversationLine.fromPrimitives(entryPoint) : undefined;
    return this;
  }
  private geNextById(id: string,): ConversationItem | undefined {
    return this.getCurrentNode().getNext().find(i => i.getId() === id);
  }

  private getNodeById(id: string, parent: ConversationItem): ConversationItem | undefined {
    if (parent.getId() === id) {
      return parent;
    }
    const next: ConversationItem[] = parent.getNext();
    for (const item of next) {
      const found = item.getId() === id;
      if (found) {
        return item;
      }
      return this.getNodeById(id, item);
    }
  }

  private getEntryPoint() {
    assert(this.entryPoint, "Conversation never started");
    return this.entryPoint;
  }
}
