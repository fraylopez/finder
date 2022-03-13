import { expect } from "chai";
import { TestUtils } from "../../utils/TestUtils";
import { BackofficeBackendAcceptanceTest } from "./utils/BackofficeBackendAcceptanceTest";

describe(`${TestUtils.getAcceptanceTestPath(__dirname)}`, () => {
  describe("Candidate", () => {
    before(async () => {
      await BackofficeBackendAcceptanceTest.start();
    });

    after(async () => {
      await BackofficeBackendAcceptanceTest.stop();
    });

    it('should retrieve all candidates', async () => {
      await BackofficeBackendAcceptanceTest.addRandomCandidate();
      const response = await BackofficeBackendAcceptanceTest.get(`/candidate`);
      expect(response.status).eq(200);
    });
    it('should retrieve a candidate', async () => {
      const created = await BackofficeBackendAcceptanceTest.addRandomCandidate();
      const uid = created.id.toString();
      const response = await BackofficeBackendAcceptanceTest.get(`/candidate/${uid}`);
      expect(response.status).eq(200);
    });
  });
});