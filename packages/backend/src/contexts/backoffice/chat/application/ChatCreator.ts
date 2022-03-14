import { inject, injectable } from "inversify";
import { sharedTypes } from "../../../../apps/_shared/ioc/sharedTypes";
import { Conversation } from "../../../_shared/domain/chat/Conversation";
import { ConversationRepository } from "../../../_shared/domain/chat/ConversationRepository";

interface Params {
  id: string;
}

@injectable()
export class ChatCreator {
  constructor(
    @inject(sharedTypes.ConversationRepository) private readonly repository: ConversationRepository
  ) { }

  async create({ id }: Params) {
    const conversation = Conversation.create({ id });
    await this.repository.create(conversation);
  }
}
