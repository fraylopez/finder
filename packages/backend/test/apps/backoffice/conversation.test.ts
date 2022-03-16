import { expect } from "chai";
import { container } from "../../../src/apps/backoffice/ioc/installer";
import { sharedTypes } from "../../../src/apps/_shared/ioc/sharedTypes";
import { Uuid } from "../../../src/contexts/_core/domain/value-object/Uuid";
import { ConversationRepository } from "../../../src/contexts/_shared/domain/chat/ConversationRepository";
import { WordMother } from "../../contexts/_shared/domain/WordMother";
import { TestUtils } from "../../utils/TestUtils";
import { BackofficeBackendAcceptanceTest } from "./utils/BackofficeBackendAcceptanceTest";

describe(`${TestUtils.getAcceptanceTestPath(__dirname)}`, () => {

  describe('Conversation', () => {
    before(async () => {
      await BackofficeBackendAcceptanceTest.start();
    });

    after(async () => {
      await BackofficeBackendAcceptanceTest.stop();
    });


    it('should create a conversation', async () => {
      const conversationId = Uuid.random().toString();
      const response = await BackofficeBackendAcceptanceTest.post(`/chat/${conversationId}`);
      const repo = container.get<ConversationRepository>(sharedTypes.ConversationRepository);
      const stored = await repo.find(conversationId);
      expect(response.status).equal(200);
      expect(stored).not.equal(null);
    });


    it('should add first line to a conversation', async () => {
      const conversationId = Uuid.random().toString();
      await BackofficeBackendAcceptanceTest.post(`/chat/${conversationId}`);
      const line = WordMother.random(5);
      const response = await BackofficeBackendAcceptanceTest.patch(
        `/chat/${conversationId}`,
        {
          value: line
        }
      );

      const repo = container.get<ConversationRepository>(sharedTypes.ConversationRepository);
      const stored = await repo.find(conversationId);
      expect(stored?.getValue()).eq(line);
      expect(response.status).equal(200);
      expect(stored).not.equal(null);
    });

    it('should add new line to a conversation', async () => {
      const conversationId = Uuid.random().toString();
      await BackofficeBackendAcceptanceTest.post(`/chat/${conversationId}`);
      const response = await BackofficeBackendAcceptanceTest.patch(
        `/chat/${conversationId}`,
        {
          value: WordMother.random(5),
        }
      );

      const repo = container.get<ConversationRepository>(sharedTypes.ConversationRepository);
      const stored = await repo.find(conversationId);
      expect(response.status).equal(200);
      expect(stored).not.equal(null);
    });
  });
});