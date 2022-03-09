import { expect } from "chai";
import { Conversation } from "../../../../../../src/contexts/matchmaker/candidate/domain/chatbot/Conversation";
import { DefaultLines } from "../../../../../../src/contexts/matchmaker/candidate/domain/chatbot/DefaultLines";
import { TestUtils } from "../../../../../utils/TestUtils";
import { ConversationMother } from "./ConversationMother";
import { LineMother } from "./LineMother";

describe(`${TestUtils.getUnitTestPath(__dirname, Conversation)}`, () => {
  let conversation: Conversation;
  before(() => {
    conversation = ConversationMother.randomSequential();
  });
  beforeEach(() => {
    conversation.restart();
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
    for (let index = 0; index < 5; index++) {
      const prevValue = conversation.getValue();
      const nextNode = conversation.getNext();
      conversation.listen(nextNode[0].getId());
      expect(conversation.getCursor()).not.eq(prevValue);
      expect(conversation.getValue()).not.eq(prevValue);
    }
  });

  it('should nest conversations', () => {
    const emptyConversation = ConversationMother.emptyWithHello("conversation-id");
    const otherConversation = ConversationMother.randomSequential("other-conversation-id");

    emptyConversation.addNode(otherConversation);
    emptyConversation.listen("other-conversation-id");
    expect(emptyConversation.getCursor()).eq(otherConversation.getId());
  });

  it('should branch conversations', () => {
    const branch1 = LineMother.random("branch1");
    const branch2 = LineMother.random("branch2");
    const branchedConversation = ConversationMother.emptyWithHello("conversation-id", [branch1, branch2]);
    branchedConversation.addNode(branch1);
    branchedConversation.addNode(branch2, conversation);

    expect(branchedConversation.getNext()).lengthOf(2);
    expect(branchedConversation.listen(branch1.getId()).getNext()).lengthOf(0);
    expect(branchedConversation.listen(branch2.getId()).getNext()[0].getId())
      .eq(conversation.getId());
  });
});