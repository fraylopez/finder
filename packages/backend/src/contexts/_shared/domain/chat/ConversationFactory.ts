import assert from "assert";
import { ConversationMother } from "../../../../../test/contexts/_shared/domain/chat/ConversationMother";
import { Conversation } from "./Conversation";

export class ConversationFactory {
  private static readonly conversations: Conversation[] = [
    ConversationMother.randomSequential("test")
  ];
  static get(id: string) {
    const conversation = this.conversations.find(c => c.getId() === id);
    assert(conversation, `Unknown conversation ${id}`);
    conversation.restart();
    return conversation;
  }
}
