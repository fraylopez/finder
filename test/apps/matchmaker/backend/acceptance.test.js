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
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Uuid_1 = require("../../../../src/contexts/_shared/domain/value-object/Uuid");
const MatchMakerBackendAcceptanceTest_1 = require("./utils/MatchMakerBackendAcceptanceTest");
describe('Matchmaker Backend', () => {
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        yield MatchMakerBackendAcceptanceTest_1.MatchMakerBackendAcceptanceTest.start();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield MatchMakerBackendAcceptanceTest_1.MatchMakerBackendAcceptanceTest.reset();
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        yield MatchMakerBackendAcceptanceTest_1.MatchMakerBackendAcceptanceTest.stop();
    }));
    it('should respond 200 on status check', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield MatchMakerBackendAcceptanceTest_1.MatchMakerBackendAcceptanceTest.get("/status");
        (0, chai_1.expect)(response.status).equal(200);
    }));
    it('should create match', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = Uuid_1.Uuid.random().toString();
        const response = yield MatchMakerBackendAcceptanceTest_1.MatchMakerBackendAcceptanceTest.put(`/matchmaker/${id}`);
        (0, chai_1.expect)(response.status).equal(200);
    }));
    it('should retrieve matches', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = Uuid_1.Uuid.random().toString();
        yield MatchMakerBackendAcceptanceTest_1.MatchMakerBackendAcceptanceTest.put(`/matchmaker/${id}`);
        const response = yield MatchMakerBackendAcceptanceTest_1.MatchMakerBackendAcceptanceTest.get("/matchmaker");
        const responseData = response.body;
        (0, chai_1.expect)(responseData).lengthOf(1);
        (0, chai_1.expect)(responseData.some(d => d.id === id)).eq(true);
    }));
});
