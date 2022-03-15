import { Conversation } from "../../../../../src/contexts/_shared/domain/chat/Conversation";
import { ConversationLine } from "../../../../../src/contexts/_shared/domain/chat/ConversationLine";
import { DefaultLines } from "../../../../../src/contexts/_shared/domain/chat/DefaultLines";
import { Uuid } from "../../../../../src/contexts/_core/domain/value-object/Uuid";
import { MotherCreator } from "../MotherCreator";
import { LineMother } from "./LineMother";
import { Line } from "../../../../../src/contexts/_shared/domain/chat/Line";

export class ConversationMother {
  static randomSequential(id?: string, length?: number) {
    const conversation = new Conversation(id || Uuid.random().toString());
    const _length = length || MotherCreator.random().datatype.number({ min: 5, max: 10 });
    for (let index = 0; index < _length; index++) {
      if (!index) {
        conversation.addNext(LineMother.random(index.toString()));
      }
      else {
        conversation.addNodeFrom(LineMother.random(index.toString()), (index - 1).toString());
      }
    }
    conversation.addNodeFrom(ConversationLine.fromLine(new Line("end", "nothing else to say..."), "bot"), (_length - 1).toString());
    return conversation;
  }
  static emptyWithHello(id?: string) {
    const conversation = new Conversation(id || Uuid.random().toString());
    conversation.addNext(ConversationLine.fromLine(DefaultLines.HELLO, "bot"));
    return conversation;
  }
}
