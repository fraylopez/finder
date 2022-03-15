import { injectable } from "inversify";
import { MongoRepository } from "../../../_core/infrastructure/persistence/mongo/MongoRepository";
import { Conversation } from "../../domain/chat/Conversation";
import { ConversationRepository } from "../../domain/chat/ConversationRepository";

@injectable()
export class MongoConversationRepository extends MongoRepository<Conversation> implements ConversationRepository {
  protected moduleName(): string {
    return "chat";
  }
  async find(id: string): Promise<Conversation | null> {
    const doc = await this.findOne(id);
    return doc ? new Conversation(doc._id).setPrimitives({ ...doc, id: doc._id }) : null;
  }
  create(conversation: Conversation): Promise<void> {
    return this.persist(conversation.getId(), conversation);

  }
  update(conversation: Conversation): Promise<void> {
    return this.persist(conversation.getId(), conversation);
  }
}