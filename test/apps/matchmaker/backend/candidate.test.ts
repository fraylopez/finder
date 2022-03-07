import { expect } from "chai";
import { Uuid } from "../../../../src/contexts/_shared/domain/value-object/Uuid";
import { CandidateMother } from "../../../contexts/matchmaker/candidate/domain/CandidateMother";
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

  it('should create a candidate', async () => {
    const uid = Uuid.random().toString();
    const response = await MatchMakerBackendAcceptanceTest.put(`/candidate/${uid}`);
    expect(response.status).eq(200);
  });

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
});