import request from "supertest";
import { setupEnvDependencies } from "../../../../src/apps/matchmaker/ioc/env-config";
import { container } from "../../../../src/apps/matchmaker/ioc/installer";
import { types } from "../../../../src/apps/matchmaker/ioc/types";
import { MatchMakerBackendApp } from "../../../../src/apps/matchmaker/MatchMakerBackendApp";
import { coreTypes } from "../../../../src/apps/_core/ioc/coreTypes";
import { sharedTypes } from "../../../../src/apps/_shared/ioc/sharedTypes";
import { CandidateRepository } from "../../../../src/contexts/matchmaker/candidate/domain/CandidateRepository";
import { DomainEvent } from "../../../../src/contexts/_core/domain/bus/DomainEvent";
import { EventBus } from "../../../../src/contexts/_core/domain/bus/EventBus";
import { Uuid } from "../../../../src/contexts/_core/domain/value-object/Uuid";
import { CardRepository } from "../../../../src/contexts/_shared/domain/card/CardRepository";
import { CandidateMother } from "../../../contexts/matchmaker/candidate/domain/CandidateMother";
import { CardMother } from "../../../contexts/_shared/domain/card/CardMother";
import io, { Socket } from "socket.io-client";

export class MatchMakerBackendAcceptanceTest {
  private static application: MatchMakerBackendApp;
  private static cachedEnv?: string;
  private static wss: typeof Socket;
  static async start() {
    this.cachedEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "acceptance";
    setupEnvDependencies(container);
    this.application = new MatchMakerBackendApp();
    await this.application.start();
    const baseUrl = `ws://localhost:${process.env.PORT || '3000'}`;

    await new Promise<void>((resolve, reject) => {
      this.wss = io(
        baseUrl,
        {
          autoConnect: false,
          transports: ["websocket"],
          query: { uid: "acceptance-test" }
        });
      this.wss.on("error", reject);
      this.wss.on("connect", resolve);
      this.wss.connect();
    });
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
    const eventBus = container.get<EventBus>(coreTypes.EventBus);
    await eventBus.publish([event]);
  }
  static emit(messageName: string, message: any) {
    this.wss.on("error", console.log);
    this.wss.emit(messageName, message);
  }

  static async addRandomCard(cardId?: Uuid) {
    const card = CardMother.random(cardId);
    const cardRepsitory = container.get<CardRepository>(sharedTypes.CardRepository);
    await cardRepsitory.add(card);
    return card;
  }
  static async addRandomCandidate(candidateId?: Uuid) {
    const candidate = CandidateMother.random(candidateId);
    const cardRepsitory = container.get<CandidateRepository>(types.CandidateRepository);
    await cardRepsitory.add(candidate);
    return candidate;
  }
}
