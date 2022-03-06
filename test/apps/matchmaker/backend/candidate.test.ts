import { expect } from "chai";
import { Uuid } from "../../../../src/contexts/_shared/domain/value-object/Uuid";
import { MatchMakerBackendAcceptanceTest } from "./utils/MatchMakerBackendAcceptanceTest";

describe('Candidate', () => {
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
    const matchId = Uuid.random().toString();

    await MatchMakerBackendAcceptanceTest.put(`/candidate/${uid}`);
    const response = await MatchMakerBackendAcceptanceTest.put(
      `/candidate/${uid}/swipe/${matchId}`,
      {
        right: Math.random() > .5
      }
    );
    expect(response.status).eq(200);
  });
});