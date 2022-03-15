import { assert } from "console";
import { inject, injectable } from "inversify";
import { coreTypes } from "../../../../apps/_core/ioc/coreTypes";
import { sharedTypes } from "../../../../apps/_shared/ioc/sharedTypes";
import { EventBus } from "../../../_core/domain/bus/EventBus";
import { Conversation } from "../../../_shared/domain/chat/Conversation";
import { ConversationItem } from "../../../_shared/domain/chat/ConversationItem";
import { ConversationLine } from "../../../_shared/domain/chat/ConversationLine";
import { ConversationRepository } from "../../../_shared/domain/chat/ConversationRepository";
import { Line } from "../../../_shared/domain/chat/Line";

interface LineParams {
  id: string;
  value: string;
  from?: string;
  fromNodeId?: string;
}
interface ConversationParams {
  conversationId: string;
  linkToConversationId: string;
  fromNodeId?: string;
}

@injectable()
export class ChatUpdater {
  constructor(
    @inject(sharedTypes.ConversationRepository) private readonly repository: ConversationRepository,
    @inject(coreTypes.EventBus) private readonly eventBus: EventBus,
  ) { }

  async addLine({ id, value, from, fromNodeId }: LineParams) {
    const conversation = await this.repository.find(id);
    assert(conversation, `Uknown conversation ${id}`);
    await this.addNode(
      conversation!,
      new ConversationLine(
        new Line(id, value),
        from
      ),
      fromNodeId,
    );
  }

  async addNestedConversation({ conversationId, linkToConversationId, fromNodeId }: ConversationParams) {
    const conversation = await this.repository.find(conversationId);
    assert(conversation, `Uknown conversation ${conversationId}`);
    const linkedConversation = await this.repository.find(linkToConversationId);
    assert(linkedConversation, `Uknown conversation ${linkToConversationId}`);
    await this.addNode(conversation!, linkedConversation!, fromNodeId);
  }

  private async addNode(conversation: Conversation, node: ConversationItem, fromNodeId?: string) {
    if (fromNodeId) {
      conversation.attachNodeTo(node, fromNodeId);
    } else {
      conversation.addNext(node);
    }
    await this.repository.update(conversation);
    await this.eventBus.publish(conversation.pullDomainEvents());
  }
}
