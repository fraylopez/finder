import { expect } from "chai";
import { container } from "../../../../src/apps/backend/ioc/installer";
import { types } from "../../../../src/apps/backend/ioc/types";
import { CandidateRepository } from "../../../../src/contexts/matchmaker/candidate/domain/CandidateRepository";
import { CandidateIsNotMatchError } from "../../../../src/contexts/matchmaker/candidate/domain/errors/CandidateIsNotMatchError";
import { UnknownCandidateError } from "../../../../src/contexts/matchmaker/candidate/domain/errors/UnknownCandidateError";
import { UnknownCardError } from "../../../../src/contexts/matchmaker/card/domain/errors/UnknownCardError";
import { InvalidEmailError } from "../../../../src/contexts/_shared/domain/InvalidEmailError";
import { Uuid } from "../../../../src/contexts/_shared/domain/value-object/Uuid";
import { CandidateMother } from "../../../contexts/matchmaker/candidate/domain/CandidateMother";
import { ConversationMother } from "../../../contexts/matchmaker/candidate/domain/chatbot/ConversationMother";
import { CardMother } from "../../../contexts/matchmaker/card/domain/CardMother";
import { TestUtils } from "../../../utils/TestUtils";
import { MatchMakerBackendAcceptanceTest } from "./utils/MatchMakerBackendAcceptanceTest";

describe(`${TestUtils.getAcceptanceTestPath(__dirname, "Candidate")}`, () => {
  before(async () => {
    await MatchMakerBackendAcceptanceTest.start();
  });

  afterEach(async () => {
    await MatchMakerBackendAcceptanceTest.reset();
  });

  after(async () => {
    await MatchMakerBackendAcceptanceTest.stop();
  });

  describe('candidate', () => {
    it('should create a candidate', async () => {
      const uid = Uuid.random().toString();
      const response = await MatchMakerBackendAcceptanceTest.put(`/candidate/${uid}`);
      expect(response.status).eq(200);
    });
  });

  describe('swipe', () => {
    it('should allow swipe from candidate', async () => {
      const uid = Uuid.random().toString();
      const card = CardMother.random();
      const cardId = card.id.toString();

      await MatchMakerBackendAcceptanceTest.put(`/card/${cardId}`);
      await MatchMakerBackendAcceptanceTest.put(`/candidate/${uid}`);

      const response = await MatchMakerBackendAcceptanceTest.put(
        `/candidate/${uid}/swipe/${cardId}`,
        {
          right: Math.random() > .5
        }
      );
      expect(response.status).eq(200);
    });

    it('should decline swipe from unknown candidate', async () => {
      const uid = Uuid.random().toString();
      const card = CardMother.random();
      const cardId = card.id.toString();

      await MatchMakerBackendAcceptanceTest.put(`/card/${cardId}`);

      const response = await MatchMakerBackendAcceptanceTest.put(
        `/candidate/${uid}/swipe/${cardId}`,
        {
          right: Math.random() > .5
        }
      );
      expect(response.status).eq(404);
      expect(response.body.message).contains(UnknownCandidateError.name);
    });
    it('should decline swipe from unknown card', async () => {
      const uid = Uuid.random().toString();
      const card = CardMother.random();
      const cardId = card.id.toString();

      await MatchMakerBackendAcceptanceTest.put(`/candidate/${uid}`);

      const response = await MatchMakerBackendAcceptanceTest.put(
        `/candidate/${uid}/swipe/${cardId}`,
        {
          right: Math.random() > .5
        }
      );
      expect(response.status).eq(404);
      expect(response.body.message).contains(UnknownCardError.name);
    });
  });

  describe('chat', () => {
    let candidateRepository: CandidateRepository;
    beforeEach(() => {
      candidateRepository = container.get(types.CandidateRepository);
    });

    it('should handle match candidate conversations', async () => {
      const candidate = CandidateMother.match();
      candidate.startChat(ConversationMother.randomSequential());

      const uid = candidate.id.toString();
      await candidateRepository.add(candidate);
      candidateRepository;
      const response = await MatchMakerBackendAcceptanceTest.put(
        `/candidate/${uid}/talk`,
        {
          responseId: "some-id"
        }
      );
      expect(response.status).eq(200);
    });

    it('should decline non match candidate conversations', async () => {
      const candidate = CandidateMother.random();
      const uid = candidate.id.toString();
      await candidateRepository.add(candidate);
      console.log(candidate);

      const response = await MatchMakerBackendAcceptanceTest.put(
        `/candidate/${uid}/talk`,
        {
          responseId: "some-id"
        }
      );
      console.log(response.error);
      expect(response.status).eq(403);
      expect(response.body.message).contains(CandidateIsNotMatchError.name);
    });
  });

  describe('mail', () => {
    let candidateRepository: CandidateRepository;
    beforeEach(() => {
      candidateRepository = container.get(types.CandidateRepository);
    });

    it('should decline mail updates from unknown users', async () => {
      const uid = Uuid.random().toString();
      const response = await MatchMakerBackendAcceptanceTest.patch(
        `/candidate/${uid}/mail`,
        {
          mail: "somemail@mail.com"
        }
      );
      expect(response.status).eq(404);
      expect(response.body.message).contains(UnknownCandidateError.name);
    });

    it('should decline mail updates with invalid mails', async () => {
      const candidate = CandidateMother.random();
      const uid = candidate.id.toString();
      await candidateRepository.add(candidate);
      const response = await MatchMakerBackendAcceptanceTest.patch(
        `/candidate/${uid}/mail`,
        {
          mail: "somemail@mailcom"
        }
      );
      expect(response.status).eq(400);
      expect(response.body.message).contains(InvalidEmailError.name);
    });

    it('should update user mail', async () => {
      const candidate = CandidateMother.random();
      const uid = candidate.id.toString();
      await candidateRepository.add(candidate);
      const response = await MatchMakerBackendAcceptanceTest.patch(
        `/candidate/${uid}/mail`,
        {
          mail: "somemail@mail.com"
        }
      );
      expect(response.status).eq(200);
    });
  });
});