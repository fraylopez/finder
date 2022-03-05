import request from "supertest";
import { MatchMakerBackendApp } from "../../../../../src/apps/matchmaker/backend/MatchMakerBackendApp";

export class MatchMakerBackendAcceptanceTest {
  private static application: MatchMakerBackendApp;
  private static _request: MatchMakerBackendApp;
  private static _response: MatchMakerBackendApp;
  static async start() {
    this.application = new MatchMakerBackendApp();
    await this.application.start();
  }
  static async stop() {
    this.application = new MatchMakerBackendApp();
    await this.application.stop();
  }

  static async get(route: string) {
    return request(this.application.httpServer).get(route);
  }
}
