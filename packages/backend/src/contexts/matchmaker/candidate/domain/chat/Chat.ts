import { ChatItem } from "./ChatItem";
import { Conversation } from "../../../../_shared/domain/chat/Conversation";
import { Line } from "../../../../_shared/domain/chat/Line";
import { ConversationFactory } from "../../../../_shared/domain/chat/ConversationFactory";

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

  talk(line: Line): ChatItem {
    this.lines.push(line);
    this.conversation.listen(line.id);
    return this.getChatItem();
  }

  toPrimitives() {
    return {
      conversation: this.conversation.toPrimitives(),
      lines: this.lines.map(l => l.toPrimitives())
    };
  }

  getChatItem(): ChatItem {
    return {
      current: this.conversation.getCurrentNode(),
      next: this.conversation.getNext(),
    };
  }

}
