import { expect } from "chai";
import { Uuid } from "../../../../src/contexts/_shared/domain/value-object/Uuid";
import { CardTitleMother } from "../../../contexts/matchmaker/card/domain/CardTitleMother";
import { MatchMakerBackendAcceptanceTest } from "./utils/MatchMakerBackendAcceptanceTest";

describe('Status', () => {
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
});