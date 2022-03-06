"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchMakerBackendAcceptanceTest = void 0;
const supertest_1 = __importDefault(require("supertest"));
const installer_1 = require("../../../../../src/apps/matchmaker/backend/ioc/installer");
const types_1 = require("../../../../../src/apps/matchmaker/backend/ioc/types");
const MatchMakerBackendApp_1 = require("../../../../../src/apps/matchmaker/backend/MatchMakerBackendApp");
const testInstaller_1 = require("./testInstaller");
class MatchMakerBackendAcceptanceTest {
    static start() {
        return __awaiter(this, void 0, void 0, function* () {
            (0, testInstaller_1.setupTestDependencies)();
            this.application = new MatchMakerBackendApp_1.MatchMakerBackendApp();
            yield this.application.start();
        });
    }
    static stop() {
        return __awaiter(this, void 0, void 0, function* () {
            this.application = new MatchMakerBackendApp_1.MatchMakerBackendApp();
            yield this.application.stop();
        });
    }
    static reset() {
        return __awaiter(this, void 0, void 0, function* () {
            installer_1.container.get(types_1.types.MatchRepository).removeAll();
            yield this.application.stop();
        });
    }
    static get(route) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, supertest_1.default)(this.application.httpServer).get(route);
        });
    }
    static put(route) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, supertest_1.default)(this.application.httpServer).put(route);
        });
    }
}
exports.MatchMakerBackendAcceptanceTest = MatchMakerBackendAcceptanceTest;
