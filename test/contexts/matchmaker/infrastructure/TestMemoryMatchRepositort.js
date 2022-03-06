"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestMemoryMatchRepository = void 0;
const MemoryMatchRepository_1 = require("../../../../src/contexts/matchmaker/infrastructure/MemoryMatchRepository");
class TestMemoryMatchRepository extends MemoryMatchRepository_1.MemoryMatchRepository {
    removeAll() {
        this.matches = [];
    }
}
exports.TestMemoryMatchRepository = TestMemoryMatchRepository;
