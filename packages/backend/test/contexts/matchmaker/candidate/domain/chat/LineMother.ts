import { ConversationLine } from "../../../../../../src/contexts/_shared/domain/chat/ConversationLine";
import { Line } from "../../../../../../src/contexts/_shared/domain/chat/Line";
import { Uuid } from "../../../../../../src/contexts/_core/domain/value-object/Uuid";
import { WordMother } from "../../../../_shared/domain/WordMother";

export class LineMother {
  static random(id?: string) {
    return ConversationLine.fromLine(
      new Line(id || Uuid.random().toString(), WordMother.random(5)),
      "bot"
    );
  }

}
