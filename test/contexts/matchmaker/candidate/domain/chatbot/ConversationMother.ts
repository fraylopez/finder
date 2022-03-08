import { Conversation } from "../../../../../../src/contexts/matchmaker/candidate/domain/chatbot/Conversation";
import { ConversationItem } from "../../../../../../src/contexts/matchmaker/candidate/domain/chatbot/ConversationItem";
import { ConversationLine } from "../../../../../../src/contexts/matchmaker/candidate/domain/chatbot/ConversationLine";
import { DefaultLines } from "../../../../../../src/contexts/matchmaker/candidate/domain/chatbot/DefaultLines";
import { Uuid } from "../../../../../../src/contexts/_shared/domain/value-object/Uuid";
import { MotherCreator } from "../../../../_shared/domain/MotherCreator";
import { LineMother } from "./LineMother";

export class ConversationMother {
  static randomSequential(id?: string, length?: number) {
    const conversation = new Conversation(id || Uuid.random().toString());
    const _length = length || MotherCreator.random().datatype.number({ min: 5, max: 10 });
    for (let index = 0; index < _length; index++) {
      let item: ConversationItem = LineMother.random(index.toString());
      let next: ConversationItem = LineMother.random((index + 1).toString());
      conversation.addNode(item, next);
    }

    return conversation;
  }
  static emptyWithHello(id?: string, next?: ConversationItem | ConversationItem[]) {
    const conversation = new Conversation(id || Uuid.random().toString());
    conversation.addNode(ConversationLine.fromLine(DefaultLines.HELLO), next);
    return conversation;
  }
}
