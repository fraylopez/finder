import { expect } from "chai";
import { container } from "../../../src/apps/matchmaker/ioc/installer";
import { types } from "../../../src/apps/matchmaker/ioc/types";
import { CandidateIsNotMatchError } from "../../../src/contexts/matchmaker/candidate/domain/errors/CandidateIsNotMatchError";
import { UnknownCandidateError } from "../../../src/contexts/matchmaker/candidate/domain/errors/UnknownCandidateError";
import { UnknownCardError } from "../../../src/contexts/_shared/domain/card/errors/UnknownCardError";
import { InvalidEmailError } from "../../../src/contexts/_core/domain/InvalidEmailError";
import { Uuid } from "../../../src/contexts/_core/domain/value-object/Uuid";
import { CandidateMother } from "../../contexts/matchmaker/candidate/domain/CandidateMother";
import { ConversationMother } from "../../contexts/matchmaker/candidate/domain/chatbot/ConversationMother";
import { TestUtils } from "../../utils/TestUtils";
import { MatchMakerBackendAcceptanceTest } from "./utils/MatchMakerBackendAcceptanceTest";
import { CandidateRepository } from "../../../src/contexts/matchmaker/candidate/domain/CandidateRepository";

describe(`${TestUtils.getAcceptanceTestPath(__dirname)}`, () => {
  describe("Candidate", () => {
    before(async () => {
      await MatchMakerBackendAcceptanceTest.start();
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
        const cardId = Uuid.random();
        await MatchMakerBackendAcceptanceTest.addRandomCard(cardId);

        const uid = Uuid.random();
        await MatchMakerBackendAcceptanceTest.addRandomCandidate(uid);

        const response = await MatchMakerBackendAcceptanceTest.put(
          `/candidate/${uid.toString()}/swipe/${cardId.toString()}`,
          {
            right: Math.random() > .5
          }
        );
        expect(response.status).eq(200);
      });

      it('should decline swipe from unknown candidate', async () => {
        const cardId = Uuid.random();
        await MatchMakerBackendAcceptanceTest.addRandomCard(cardId);
        const uid = Uuid.random().toString();

        const response = await MatchMakerBackendAcceptanceTest.put(
          `/candidate/${uid}/swipe/${cardId.toString()}`,
          {
            right: Math.random() > .5
          }
        );
        expect(response.status).eq(404);
        expect(response.body.message).contains(UnknownCandidateError.name);
      });
      it('should decline swipe from unknown card', async () => {
        const cardId = Uuid.random();
        const uid = Uuid.random();
        await MatchMakerBackendAcceptanceTest.addRandomCandidate(uid);

        const response = await MatchMakerBackendAcceptanceTest.put(
          `/candidate/${uid.toString()}/swipe/${cardId.toString()}`,
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
        candidate.startChat(ConversationMother.randomSequential("test"));

        const uid = candidate.id.toString();
        await candidateRepository.add(candidate);
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

        const response = await MatchMakerBackendAcceptanceTest.put(
          `/candidate/${uid}/talk`,
          {
            responseId: "some-id"
          }
        );
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
});