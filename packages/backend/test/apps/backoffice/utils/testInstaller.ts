import { container } from "../../../../src/apps/matchmaker/ioc/installer";
import { types } from "../../../../src/apps/matchmaker/ioc/types";
import { TestMemoryCardRepository } from "../../../contexts/_shared/infrastructure/card/TestMemoryCardRepository";

export function setupTestDependencies() {
  container.unbind(types.CardRepository);
  container.bind(types.CardRepository).to(TestMemoryCardRepository).inSingletonScope();

}
