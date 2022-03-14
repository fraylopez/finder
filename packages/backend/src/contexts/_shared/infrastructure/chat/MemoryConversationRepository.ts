import { injectable } from "inversify";
import { ConversationMother } from "../../../../../test/contexts/_shared/domain/chat/ConversationMother";
import { Conversation } from "../../domain/chat/Conversation";
import { ConversationRepository } from "../../domain/chat/ConversationRepository";

@injectable()
export class MemoryConversationRepository implements ConversationRepository {
  private readonly conversations: Map<string, Conversation>;

  constructor() {
    this.conversations = new Map();
    this.conversations.set("test", ConversationMother.randomSequential("test"));
  }

  find(id: string): Promise<Conversation | null> {
    const conversation = this.conversations.get(id);
    return Promise.resolve(conversation || null);
  }
  create(conversation: Conversation): Promise<void> {
    this.conversations.set(conversation.getId(), conversation);
    return Promise.resolve();
  }
  update(conversation: Conversation): Promise<void> {
    this.conversations.set(conversation.getId(), conversation);
    return Promise.resolve();
  }
}