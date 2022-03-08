import { Conversation } from "./Conversation";
import { ConversationFactory } from "./ConversationFactory";
import { DefaultLines } from "./DefaultLines";
import { Line } from "./Line";

interface Primitives {
  conversation: {
    id: string;
    cursor: string;
  };
  lines: { id: string, value: string; }[];
}

export class Chat {
  private lines: Line[];
  constructor(private readonly conversation: Conversation) {
    this.lines = [];
  }

  static fromPrimitives({ conversation, lines }: Primitives) {
    const currentConversation = ConversationFactory.get(conversation.id)!;
    currentConversation.setPrimitives(conversation);
    const chat = new Chat(currentConversation);
    chat.lines = lines.map(l => new Line(l.id, l.value));
    return chat;
  }

  add(line: Line) {
    this.lines.push(line);
    this.conversation.listen(line.id);
  }

  getNext() {
    return this.conversation.getNext();
  }

  toPrimitives() {
    return {
      conversation: this.conversation.toPrimitives(),
      lines: this.lines.map(l => l.toPrimitives())
    };
  }
}
