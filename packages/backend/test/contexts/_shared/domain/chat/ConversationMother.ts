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
        conversation.attachNodeTo(LineMother.random(index.toString()), (index - 1).toString());
      }
    }
    conversation.attachNodeTo(ConversationLine.fromLine(new Line("end", "nothing else to say..."), "bot"), (_length - 1).toString());
    return conversation;
  }
  static emptyWithHello(id?: string) {
    const conversation = new Conversation(id || Uuid.random().toString());
    conversation.addNext(ConversationLine.fromLine(DefaultLines.HELLO, "bot"));
    return conversation;
  }

  static sample() {
    const sampleConversation = new Conversation("demo");
    sampleConversation
      .addNext(
        ConversationLine.fromLine(new Line("hello", "Hello there! It looks like you are a match!"), "bot")
          .addNext(ConversationLine.fromLine(new Line("hello_response_1", "A match for what?"), "bot"))
          .addNext(ConversationLine.fromLine(new Line("hello_response_2", "Hello to you!"), "bot"))
      )
      .attachNodeTo(
        ConversationLine.fromLine(new Line("company", "By now you already now there is a company behind this, right?"), "bot")
          .addNext(ConversationLine.fromLine(new Line("company_response_1", "Really? I thought I got lucky..."), "bot"))
          .addNext(ConversationLine.fromLine(new Line("company_response_2", "Come on... say you part"), "bot"))
        ,
        ["hello_response_1", "hello_response_2"]
      )
      .attachNodeTo(
        ConversationLine.fromLine(new Line("software", "We are looking for software engineers, and you may be a good candidate"), "bot")
          .addNext(ConversationLine.fromLine(new Line("software_response_1", "Which company?"), "bot"))
        ,
        ["company_response_1", "company_response_2"]
      )
      .attachNodeTo(
        ConversationLine.fromLine(new Line("unknown_company", "Well, lets keep the mistery for a while ;-)"), "bot")
          .addNext(ConversationLine.fromLine(new Line("unknown_company_response_1", "Ok, so what?"), "bot"))
          .addNext(ConversationLine.fromLine(new Line("unknown_company_response_2", "Better be worth it..."), "bot"))
        ,
        "software_response_1"
      )
      .attachNodeTo(
        ConversationLine.fromLine(new Line("code", "Could you maintain the code of this app?"), "bot")
          .addNext(ConversationLine.fromLine(new Line("code_response_1", "Yes"), "bot"))
          .addNext(ConversationLine.fromLine(new Line("code_response_2", "I can do it better"), "bot"))
          .addNext(ConversationLine.fromLine(new Line("code_response_3", "No"), "bot"))
        ,
        ["unknown_company_response_1", "unknown_company_response_2"]
      )
      .attachNodeTo(
        ConversationLine.fromLine(new Line("code_no", "Ok, thank you for your time then!"), "bot")
        ,
        ["code_response_3"]
      )
      .attachNodeTo(
        ConversationLine.fromLine(new Line("code_yes", "Prove it!"), "bot"),
        ["code_response_1", "code_response_2"]
      )
      ;
    return sampleConversation;
  }
}
