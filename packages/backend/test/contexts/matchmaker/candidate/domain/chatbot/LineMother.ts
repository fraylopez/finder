import { ConversationLine } from "../../../../../../src/contexts/matchmaker/candidate/domain/chatbot/ConversationLine";
import { Line } from "../../../../../../src/contexts/matchmaker/candidate/domain/chatbot/Line";
import { Uuid } from "../../../../../../src/contexts/_shared/domain/value-object/Uuid";
import { WordMother } from "../../../../_shared/domain/WordMother";

export class LineMother {
  static random(id?: string) {
    return ConversationLine.fromLine(
      new Line(id || Uuid.random().toString(), WordMother.random(5))
    );
  }

}
