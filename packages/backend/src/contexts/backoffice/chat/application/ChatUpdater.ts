import { assert } from "console";
import { inject, injectable } from "inversify";
import { sharedTypes } from "../../../../apps/_shared/ioc/sharedTypes";
import { ConversationRepository } from "../../../_shared/domain/chat/ConversationRepository";

interface Params {
  id: string;
}

@injectable()
export class ChatUpdater {
  constructor(
    @inject(sharedTypes.ConversationRepository) private readonly repository: ConversationRepository
  ) { }

  async update({ id }: Params) {
    const conversation = await this.repository.find(id);
    assert(conversation, "Uknown conversation");
    // TODO: process update
    await this.repository.update(conversation!);
  }
}
