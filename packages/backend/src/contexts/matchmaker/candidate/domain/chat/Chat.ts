import { Conversation } from "../../../../_shared/domain/chat/Conversation";
import { Line } from "../../../../_shared/domain/chat/Line";
import { ConversationFactory } from "../../../../_shared/domain/chat/ConversationFactory";
import { ConversationItem } from "../../../../_shared/domain/chat/ConversationItem";

interface ConversationPath {
  id: string,
  value: string;
  from: string;
}
interface Primitives {
  conversation: any;
  path: ConversationPath[];
}
export class Chat {
  private path: ConversationPath[];
  constructor(private readonly conversation: Conversation) {
    this.path = [];
    const first = conversation.getFirstNode();
    if (first) {
      this.path.push({ id: first.getId(), value: first.getValue(), from: first.getFrom() });
    }
  }

  static fromPrimitives({ conversation, path }: Primitives) {
    const currentConversation = ConversationFactory.get(conversation.id)!;
    currentConversation.setPrimitives(conversation);
    const chat = new Chat(currentConversation);
    chat.path = path;
    return chat;
  }

  talk(line: Line, from: string): ConversationItem {
    this.path.push({ id: line.id, value: line.value, from });
    this.conversation.listen(line.id);
    this.conversation.respond();
    return this.getCurrentNode();
  }

  toPrimitives() {
    return {
      conversation: this.conversation.toPrimitives(),
      path: this.path,
    };
  }

  getCurrentNode(): ConversationItem {
    return this.conversation.getCurrentNode();
  }

  getPath() {
    return this.path;
  }
}
