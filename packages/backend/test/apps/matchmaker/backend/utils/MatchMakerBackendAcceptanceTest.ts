import e from "express";
import request from "supertest";
import { container } from "../../../../../src/apps/backend/ioc/installer";
import { types } from "../../../../../src/apps/backend/ioc/types";
import { MatchMakerBackendApp } from "../../../../../src/apps/backend/MatchMakerBackendApp";
import { DomainEvent } from "../../../../../src/contexts/_shared/domain/bus/DomainEvent";
import { EventBus } from "../../../../../src/contexts/_shared/domain/bus/EventBus";
import { TestMemoryCardRepository } from "../../../../contexts/matchmaker/card/infrastructure/TestMemoryCardRepository";
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
    container.get<TestMemoryCardRepository>(types.CardRepository).removeAll();
    await this.application.stop();
  }

  static async get(route: string) {
    return request(this.application.httpServer).get(route);
  }
  static async put(route: string, body?: object) {
    return request(this.application.httpServer).put(route).send(body);
  }
  static async publish(event: DomainEvent) {
    const eventBus = container.get<EventBus>(types.EventBus);
    eventBus.publish([event]);
  }
}
