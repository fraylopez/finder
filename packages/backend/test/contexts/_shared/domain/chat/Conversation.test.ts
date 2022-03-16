import { expect } from "chai";
import { Conversation } from "../../../../../src/contexts/_shared/domain/chat/Conversation";
import { ConversationLine } from "../../../../../src/contexts/_shared/domain/chat/ConversationLine";
import { DefaultLines } from "../../../../../src/contexts/_shared/domain/chat/DefaultLines";
import { Line } from "../../../../../src/contexts/_shared/domain/chat/Line";
import { TestUtils } from "../../../../utils/TestUtils";
import { ConversationMother } from "./ConversationMother";
import { LineMother } from "./LineMother";

describe(`${TestUtils.getUnitTestPath(__dirname, Conversation)}`, () => {
  let conversation: Conversation;
  const length = 5;
  before(() => {
    conversation = ConversationMother.randomSequential(undefined, length);
  });
  beforeEach(() => {
    conversation.restart();
  });

  it('should serialize to primitives', async () => {
    const serialized = conversation.toPrimitives();
    const deserialized = new Conversation(serialized.id).setPrimitives(serialized);
    expect(conversation).eql(deserialized);
  });

  it('should have a first node', () => {
    expect(conversation.getCurrentNode().getValue()).not.eq(DefaultLines.UNKNOWN.value);
  });
  it('should have next nodes', () => {
    expect(conversation.getNext()).length.greaterThan(0);
  });
  it('should remain in same node on unknown id', () => {
    expect(conversation.listen("unknown").getCurrentNode()).eql(conversation.getCurrentNode());
  });
  it('should increase cursor', () => {
    for (let index = 0; index < length; index++) {
      const prevCursor = conversation.getCursor();
      const nextNode = conversation.getNext();
      conversation.listen(nextNode[0].getId());
      expect(conversation.getCursor()).not.eq(prevCursor);
    }
  });

  it('should nest conversations', () => {
    const emptyConversation = ConversationMother.emptyWithHello("conversation-id");
    const otherConversation = ConversationMother.randomSequential("other-conversation-id");

    emptyConversation.addNext(otherConversation);
    emptyConversation.listen("other-conversation-id");
    expect(emptyConversation.getCursor()).eq(otherConversation.getId());
  });

  it('should branch conversations', () => {
    const branch1 = LineMother.random("branch1");
    const branch2 = LineMother.random("branch2");
    const branchedConversation = ConversationMother.emptyWithHello("conversation-id");
    branchedConversation.attachNodeTo(branch1, "hello",);
    branchedConversation.attachNodeTo(branch2, "hello",);
    expect(branchedConversation.getNext()).lengthOf(2);
  });

  it('should end a conversation', async () => {
    const sampleConversation = new Conversation("demo");
    sampleConversation
      .addNext(
        ConversationLine.fromLine(new Line("hello", "helloline"), "bot")
          .addNext(ConversationLine.fromLine(new Line("hello_response_1", "responseline"), "bot"))
      )
      .attachNodeTo(
        ConversationLine.fromLine(new Line("end_1", "endline"), "bot")
        ,
        ["hello_response_1"]
      );

    expect(
      sampleConversation
        .listen("hello_response_1")
        .listen("end_1")
        .getValue()
    ).eq("endline");
  });

  it('should end a 2 ending conversation', async () => {
    const sampleConversation = new Conversation("demo");
    sampleConversation
      .addNext(
        ConversationLine.fromLine(new Line("hello", "helloline"), "bot")
          .addNext(ConversationLine.fromLine(new Line("hello_response_1", "responseline1"), "bot"))
          .addNext(ConversationLine.fromLine(new Line("hello_response_2", "responseline2"), "bot"))
      )
      .attachNodeTo(
        ConversationLine.fromLine(new Line("end_1", "endline1"), "bot")
        ,
        ["hello_response_1"]
      )
      .attachNodeTo(
        ConversationLine.fromLine(new Line("end_2", "endline2"), "bot")
        ,
        ["hello_response_2"]
      )
      ;

    expect(
      sampleConversation
        .listen("hello_response_2")
        .listen("end_2")
        .getValue()
    ).eq("endline2");
  });
});