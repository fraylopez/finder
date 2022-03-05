import request from "supertest";
import { container } from "../../../../../src/apps/matchmaker/backend/ioc/installer";
import { types } from "../../../../../src/apps/matchmaker/backend/ioc/types";
import { MatchMakerBackendApp } from "../../../../../src/apps/matchmaker/backend/MatchMakerBackendApp";
import { TestMemoryMatchRepository } from "../../../../contexts/matchmaker/infrastructure/TestMemoryMatchRepositort";
import { setupTestDependencies } from "./testInstaller";

export class MatchMakerBackendAcceptanceTest {
  private static application: MatchMakerBackendApp;
  private static _request: MatchMakerBackendApp;
  private static _response: MatchMakerBackendApp;
  static async start() {
    setupTestDependencies();
    this.application = new MatchMakerBackendApp();
    await this.application.start();
  }
  static async stop() {
    this.application = new MatchMakerBackendApp();
    await this.application.stop();
  }
  static async reset() {
    container.get<TestMemoryMatchRepository>(types.MatchRepository).removeAll();
    await this.application.stop();
  }

  static async get(route: string) {
    return request(this.application.httpServer).get(route);
  }
  static async put(route: string) {
    return request(this.application.httpServer).put(route);
  }
}
