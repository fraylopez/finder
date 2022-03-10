import { expect } from "chai";
import { TestUtils } from "../../../utils/TestUtils";
import { MatchMakerBackendAcceptanceTest } from "./utils/MatchMakerBackendAcceptanceTest";

describe(`${TestUtils.getAcceptanceTestPath(__dirname, "Status")}`, () => {
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
});