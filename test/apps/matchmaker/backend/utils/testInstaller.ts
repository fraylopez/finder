import { container } from "../../../../../src/apps/matchmaker/backend/ioc/installer";
import { types } from "../../../../../src/apps/matchmaker/backend/ioc/types";
import { TestMemoryMatchRepository } from "../../../../contexts/matchmaker/infrastructure/TestMemoryMatchRepositort";

export function setupTestDependencies() {
  container.unbind(types.MatchRepository);
  container.bind(types.MatchRepository).to(TestMemoryMatchRepository).inSingletonScope();

}
