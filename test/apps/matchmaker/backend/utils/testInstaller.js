"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupTestDependencies = void 0;
const installer_1 = require("../../../../../src/apps/matchmaker/backend/ioc/installer");
const types_1 = require("../../../../../src/apps/matchmaker/backend/ioc/types");
const TestMemoryMatchRepositort_1 = require("../../../../contexts/matchmaker/infrastructure/TestMemoryMatchRepositort");
function setupTestDependencies() {
    installer_1.container.unbind(types_1.types.MatchRepository);
    installer_1.container.bind(types_1.types.MatchRepository).to(TestMemoryMatchRepositort_1.TestMemoryMatchRepository).inSingletonScope();
}
exports.setupTestDependencies = setupTestDependencies;
