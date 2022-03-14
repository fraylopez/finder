import { DomainEvent } from "../../../../_core/domain/bus/DomainEvent";

export class ConversationUpdatedEvent extends DomainEvent {
  static NAME = "conversation.updated";
  constructor(id: string) {
    super(ConversationUpdatedEvent.NAME, id);
  }
}