import { expect } from "chai";
import { TestUtils } from "../../utils/TestUtils";
import { MatchMakerBackendAcceptanceTest } from "./utils/MatchMakerBackendAcceptanceTest";

describe(`${TestUtils.getAcceptanceTestPath(__dirname)}`, () => {
  describe("Card", () => {
    before(async () => {
      await MatchMakerBackendAcceptanceTest.start();
    });

    after(async () => {
      await MatchMakerBackendAcceptanceTest.stop();
    });

    it('should retrieve cards', async () => {
      const card = await MatchMakerBackendAcceptanceTest.addRandomCard();
      const response = await MatchMakerBackendAcceptanceTest.get("/card");

      const responseData = response.body as any[];
      expect(responseData.pop().id).eql(card.id.toString());
    });
  });
});