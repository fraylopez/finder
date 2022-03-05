import { expect } from "chai";
import { Uuid } from "../../../../src/contexts/_shared/domain/value-object/Uuid";
import { MatchMakerBackendAcceptanceTest } from "./utils/MatchMakerBackendAcceptanceTest";

describe('Matchmaker Backend', () => {
  before(async () => {
    await MatchMakerBackendAcceptanceTest.start();
  });

  afterEach(async () => {
    await MatchMakerBackendAcceptanceTest.reset();
  });

  after(async () => {
    await MatchMakerBackendAcceptanceTest.stop();
  });

  it('should respond 200 on status check', async () => {
    const response = await MatchMakerBackendAcceptanceTest.get("/status");
    expect(response.status).equal(200);
  });

  it('should create match', async () => {
    const id = Uuid.random().toString();
    const response = await MatchMakerBackendAcceptanceTest.put(`/matchmaker/${id}`);
    expect(response.status).equal(200);
  });

  it('should retrieve matches', async () => {
    const id = Uuid.random().toString();
    await MatchMakerBackendAcceptanceTest.put(`/matchmaker/${id}`);
    const response = await MatchMakerBackendAcceptanceTest.get("/matchmaker");

    const responseData = response.body as any[];
    expect(responseData).lengthOf(1);
    expect(responseData.some(d => d.id === id)).eq(true);
  });
});