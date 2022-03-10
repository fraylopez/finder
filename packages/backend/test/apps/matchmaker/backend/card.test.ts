import { expect } from "chai";
import { Uuid } from "../../../../src/contexts/_shared/domain/value-object/Uuid";
import { CardTitleMother } from "../../../contexts/matchmaker/card/domain/CardTitleMother";
import { TestUtils } from "../../../utils/TestUtils";
import { MatchMakerBackendAcceptanceTest } from "./utils/MatchMakerBackendAcceptanceTest";

describe(`${TestUtils.getAcceptanceTestPath(__dirname, "Card")}`, () => {
  before(async () => {
    await MatchMakerBackendAcceptanceTest.start();
  });

  after(async () => {
    await MatchMakerBackendAcceptanceTest.stop();
  });

  it('should create card', async () => {
    const id = Uuid.random().toString();
    const title = CardTitleMother.random();
    const response = await MatchMakerBackendAcceptanceTest.put(`/card/${id}`, { title });
    expect(response.status).equal(200);
  });

  it('should retrieve cards', async () => {
    const id = Uuid.random().toString();
    const title = CardTitleMother.random();
    await MatchMakerBackendAcceptanceTest.put(`/card/${id}`, { title });
    const response = await MatchMakerBackendAcceptanceTest.get("/card");

    const responseData = response.body as any[];
    expect(responseData.pop()).eql({
      id: id.toString(),
      title,
    });
  });
});