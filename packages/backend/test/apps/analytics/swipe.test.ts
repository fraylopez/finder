import sinon from "ts-sinon";
import { container } from "../../../src/apps/analytics/ioc/installer";
import { types } from "../../../src/apps/analytics/ioc/types";
import { SwipeTrackerService } from "../../../src/contexts/analytics/candidate/domain/SwipeTrackerService";
import { SwipeCreatedEvent } from "../../../src/contexts/matchmaker/candidate/domain/events/SwipeCreatedEvent";
import { Uuid } from "../../../src/contexts/_core/domain/value-object/Uuid";
import { TestUtils } from "../../utils/TestUtils";
import { AnalyticsAppAcceptanceTest } from "./utils/AnalyticsAppAcceptanceTest";

describe(`${TestUtils.getAcceptanceTestPath(__dirname)}`, () => {
  describe("Swipes", () => {
    before(async () => {
      await AnalyticsAppAcceptanceTest.start();
    });

    after(async () => {
      await AnalyticsAppAcceptanceTest.stop();
    });

    it('should track swipes', async () => {
      const tacker = container.get<SwipeTrackerService>(types.SwipeTrackerService);
      const spy = AnalyticsAppAcceptanceTest.sandbox.spy(tacker, "track");
      await AnalyticsAppAcceptanceTest.publish(new SwipeCreatedEvent(Uuid.random(), Uuid.random(), true));
      sinon.assert.calledOnce(spy);
    });
  });
});