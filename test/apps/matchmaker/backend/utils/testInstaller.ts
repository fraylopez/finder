import { container } from "../../../../../src/apps/matchmaker/backend/ioc/installer";
import { types } from "../../../../../src/apps/matchmaker/backend/ioc/types";
import { TestMemoryCardRepository } from "../../../../contexts/matchmaker/card/infrastructure/TestMemoryCardRepository";

export function setupTestDependencies() {
  container.unbind(types.CardRepository);
  container.bind(types.CardRepository).to(TestMemoryCardRepository).inSingletonScope();

}
