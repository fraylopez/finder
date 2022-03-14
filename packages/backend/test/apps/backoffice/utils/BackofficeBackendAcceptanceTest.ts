import request from "supertest";
import { BackofficeBackendApp } from "../../../../src/apps/backoffice/BackofficeBackendApp";
import { setupEnvDependencies } from "../../../../src/apps/backoffice/ioc/env-config";
import { container } from "../../../../src/apps/matchmaker/ioc/installer";
import { types } from "../../../../src/apps/matchmaker/ioc/types";
import { coreTypes } from "../../../../src/apps/_core/ioc/coreTypes";
import { sharedTypes } from "../../../../src/apps/_shared/ioc/sharedTypes";
import { DomainEvent } from "../../../../src/contexts/_core/domain/bus/DomainEvent";
import { EventBus } from "../../../../src/contexts/_core/domain/bus/EventBus";
import { Uuid } from "../../../../src/contexts/_core/domain/value-object/Uuid";
import { CardRepository } from "../../../../src/contexts/_shared/domain/card/CardRepository";
import { BackofficeCandidateMother } from "../../../contexts/backoffice/domain/BackofficeCandidateMother";
import { MongoBackofficeCandidateTestRepository } from "../../../contexts/backoffice/infrastructure/BackofficeCandidateTestRepositroy";
import { CardMother } from "../../../contexts/_shared/domain/card/CardMother";

export class BackofficeBackendAcceptanceTest {
  private static application: BackofficeBackendApp;
  private static cachedEnv?: string;

  static async start() {
    this.cachedEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "acceptance";
    setupEnvDependencies(container);
    this.application = new BackofficeBackendApp();
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
  static async post(route: string, body?: object) {
    return request(this.application.httpServer).post(route).send(body);
  }
  static async publish(event: DomainEvent) {
    const eventBus = container.get<EventBus>(coreTypes.EventBus);
    await eventBus.publish([event]);
  }

  static async addRandomCard(cardId?: Uuid) {
    const card = CardMother.random(cardId);
    const repository = container.get<CardRepository>(sharedTypes.CardRepository);
    await repository.add(card);
    return card;
  }
  static async addRandomCandidate(candidateId?: Uuid) {
    const candidate = BackofficeCandidateMother.random(candidateId);
    const repository = container.get<MongoBackofficeCandidateTestRepository>(types.CandidateRepository);
    await repository.add(candidate);
    return candidate;
  }
}
