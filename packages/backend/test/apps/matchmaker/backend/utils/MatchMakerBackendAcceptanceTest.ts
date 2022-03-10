import request from "supertest";
import { setupEnvDependencies } from "../../../../../src/apps/backend/ioc/env-config";
import { container } from "../../../../../src/apps/backend/ioc/installer";
import { types } from "../../../../../src/apps/backend/ioc/types";
import { MatchMakerBackendApp } from "../../../../../src/apps/backend/MatchMakerBackendApp";
import { DomainEvent } from "../../../../../src/contexts/_shared/domain/bus/DomainEvent";
import { EventBus } from "../../../../../src/contexts/_shared/domain/bus/EventBus";

export class MatchMakerBackendAcceptanceTest {
  private static application: MatchMakerBackendApp;
  private static cachedEnv?: string;
  static async start() {
    this.cachedEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "acceptance";
    setupEnvDependencies(container);
    this.application = new MatchMakerBackendApp();
    await this.application.start();
  }
  static async stop() {
    await this.application.stop();
    process.env.NODE_ENV = this.cachedEnv;
  }

  static async get(route: string) {
    return request(this.application.httpServer).get(route);
  }
  static async put(route: string, body?: object) {
    return request(this.application.httpServer).put(route).send(body);
  }
  static async patch(route: string, body?: object) {
    return request(this.application.httpServer).patch(route).send(body);
  }
  static async publish(event: DomainEvent) {
    const eventBus = container.get<EventBus>(types.EventBus);
    await eventBus.publish([event]);
  }
}
