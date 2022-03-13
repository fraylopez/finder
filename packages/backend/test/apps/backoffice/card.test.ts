import { expect } from "chai";
import { Uuid } from "../../../src/contexts/_core/domain/value-object/Uuid";
import { CardTitleMother } from "../../contexts/_shared/domain/card/CardTitleMother";
import { TestUtils } from "../../utils/TestUtils";
import { BackofficeBackendAcceptanceTest } from "./utils/BackofficeBackendAcceptanceTest";

describe(`${TestUtils.getAcceptanceTestPath(__dirname)}`, () => {
  describe("Card", () => {
    before(async () => {
      await BackofficeBackendAcceptanceTest.start();
    });

    after(async () => {
      await BackofficeBackendAcceptanceTest.stop();
    });

    it('should create card', async () => {
      const id = Uuid.random().toString();
      const title = CardTitleMother.random();
      const response = await BackofficeBackendAcceptanceTest.put(`/card/${id}`, { title });
      expect(response.status).equal(200);
    });
  });
});