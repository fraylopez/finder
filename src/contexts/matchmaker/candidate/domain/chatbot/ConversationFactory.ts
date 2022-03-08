import { ConversationMother } from "../../../../../../test/contexts/matchmaker/candidate/domain/chatbot/ConversationMother";
import { Conversation } from "./Conversation";

export class ConversationFactory {
  private static readonly conversations: Conversation[] = [
    ConversationMother.randomSequential("test")
  ];
  static get(id: string) {
    return this.conversations.find(c => c.getId() === id);
  }
}
