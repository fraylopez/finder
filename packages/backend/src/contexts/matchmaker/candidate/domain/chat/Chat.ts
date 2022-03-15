import { ChatItem } from "./ChatItem";
import { Conversation } from "../../../../_shared/domain/chat/Conversation";
import { Line } from "../../../../_shared/domain/chat/Line";
import { ConversationFactory } from "../../../../_shared/domain/chat/ConversationFactory";
import { ConversationLine } from "../../../../_shared/domain/chat/ConversationLine";
import { ConversationItem } from "../../../../_shared/domain/chat/ConversationItem";

interface Primitives {
  conversation: any;
  lines: { id: string, value: string; }[];
}
export class Chat {
  private path: ConversationItem[];
  constructor(private readonly conversation: Conversation) {
    this.path = [];
    const first = conversation.getFirstNode();
    if (first) {
      this.path.push(first);
    }
  }

  static fromPrimitives({ conversation, lines }: Primitives) {
    const currentConversation = ConversationFactory.get(conversation.id)!;
    currentConversation.setPrimitives(conversation);
    const chat = new Chat(currentConversation);
    chat.path = lines.map(l => ConversationLine.fromLine(new Line(l.id, l.value)));
    return chat;
  }

  talk(line: Line): ChatItem {
    this.path.push(ConversationLine.fromLine(line));
    this.conversation.listen(line.id);
    return this.getChatItem();
  }

  toPrimitives() {
    return {
      conversation: this.conversation.toPrimitives(),
      lines: this.path.map(l => ({ id: l.getId(), value: l.getValue() }))
    };
  }

  getChatItem(): ChatItem {
    return {
      current: this.conversation.getCurrentNode(),
      next: this.conversation.getNext(),
    };
  }

}
