import sinon from "sinon";
import { SinonSandbox } from "sinon";
import { AnalyticsApp } from "../../../../src/apps/analytics/AnalyticsApp";
import { setupEnvDependencies } from "../../../../src/apps/analytics/ioc/env-config";
import { container } from "../../../../src/apps/analytics/ioc/installer";
import { coreTypes } from "../../../../src/apps/_core/ioc/coreTypes";
import { DomainEvent } from "../../../../src/contexts/_core/domain/bus/DomainEvent";
import { EventBus } from "../../../../src/contexts/_core/domain/bus/EventBus";

export class AnalyticsAppAcceptanceTest {
  public static sandbox: SinonSandbox;
  private static application: AnalyticsApp;
  private static cachedEnv?: string;

  static async start() {
    this.sandbox = sinon.createSandbox();
    this.cachedEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "acceptance";
    setupEnvDependencies(container);
    this.application = new AnalyticsApp();
    await this.application.start();
  }

  static async stop() {
    this.sandbox.restore();
    await this.application.stop();
    process.env.NODE_ENV = this.cachedEnv;
  }

  static async publish(event: DomainEvent) {
    const eventBus = container.get<EventBus>(coreTypes.EventBus);
    await eventBus.publish([event]);
  }
}
