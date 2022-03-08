import { ConversationLine } from "../../../../../../src/contexts/matchmaker/candidate/domain/chatbot/ConversationLine";
import { Line } from "../../../../../../src/contexts/matchmaker/candidate/domain/chatbot/Line";
import { Uuid } from "../../../../../../src/contexts/_shared/domain/value-object/Uuid";
import { MotherCreator } from "../../../../_shared/domain/MotherCreator";

export class LineMother {
  static random(id?: string) {
    return ConversationLine.fromLine(
      new Line(id || Uuid.random().toString(), MotherCreator.random().lorem.words(3))
    );
  }

}
