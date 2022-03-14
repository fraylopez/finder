import { Conversation } from "./Conversation";

export interface ConversationRepository {
  find(id: string): Promise<Conversation | null>;
  create(conversation: Conversation): Promise<void>;
  update(conversation: Conversation): Promise<void>;
}
