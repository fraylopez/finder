import { expect } from "chai";
import { MatchMakerBackendAcceptanceTest } from "./utils/MatchMakerBackendAcceptanceTest";

describe('Matchmaker Backend', () => {
  before(async () => {
    await MatchMakerBackendAcceptanceTest.start();
  });
  after(async () => {
    await MatchMakerBackendAcceptanceTest.stop();
  });

  it('should respond 200 on status check', async () => {
    const response = await MatchMakerBackendAcceptanceTest.get("/status");
    expect(response.status).equal(200);
  });

  it('should retrieve matches', async () => {
    const response = await MatchMakerBackendAcceptanceTest.get("/matchmaker");
    expect(response.status).equal(200);
    expect(response.body).eql([]);
  });
});