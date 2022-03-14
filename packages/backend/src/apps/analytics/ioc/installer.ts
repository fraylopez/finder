import "reflect-metadata";
import { coreTypes } from "../../_core/ioc/coreTypes";
import { TrackSwipeOnSwipeCreatedEvent } from "../../../contexts/analytics/candidate/application/TrackSwipeOnSwipeCreatedEvent";
import { setupEnvDependencies } from "./env-config";
import { types } from "./types";
import { MongoSwipeTrackerService } from "../../../contexts/analytics/candidate/infrastructure/MongoSwipeTracker";
import { SwipeTracker } from "../../../contexts/analytics/candidate/application/SwipeTracker";
import { getContainer } from "../../_core/ioc/installer";

export const container = getContainer();

// Tracking
container.bind(SwipeTracker).toSelf().inSingletonScope();
container.bind(types.SwipeTrackerService).to(MongoSwipeTrackerService).inSingletonScope();
container.bind(coreTypes.EventHandler).to(TrackSwipeOnSwipeCreatedEvent).inSingletonScope();


setupEnvDependencies(container);