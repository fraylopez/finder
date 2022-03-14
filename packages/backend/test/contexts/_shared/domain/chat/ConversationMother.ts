import { Conversation } from "../../../../../src/contexts/_shared/domain/chat/Conversation";
import { ConversationItem } from "../../../../../src/contexts/_shared/domain/chat/ConversationItem";
import { ConversationLine } from "../../../../../src/contexts/_shared/domain/chat/ConversationLine";
import { DefaultLines } from "../../../../../src/contexts/_shared/domain/chat/DefaultLines";
import { Uuid } from "../../../../../src/contexts/_core/domain/value-object/Uuid";
import { MotherCreator } from "../MotherCreator";
import { LineMother } from "./LineMother";

export class ConversationMother {
  static randomSequential(id?: string, length?: number) {
    const conversation = new Conversation(id || Uuid.random().toString());
    const _length = length || MotherCreator.random().datatype.number({ min: 5, max: 10 });
    for (let index = 0; index < _length; index++) {
      conversation.addNode(
        LineMother.random(index.toString()),
        LineMother.random((index + 1).toString())
      );
    }

    return conversation;
  }
  static emptyWithHello(id?: string, next?: ConversationItem | ConversationItem[]) {
    const conversation = new Conversation(id || Uuid.random().toString());
    conversation.addNode(ConversationLine.fromLine(DefaultLines.HELLO), next);
    return conversation;
  }
}
