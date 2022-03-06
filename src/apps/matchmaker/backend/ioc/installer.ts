import "reflect-metadata";
import { Container } from "inversify";
import { ConsoleLogger } from "../../../../contexts/_shared/infrastructure/logger/ConsoleLogger";
import { MatchGetController } from "../controllers/MatchGetController";
import StatusGetController from "../controllers/StatusGetController";
import { types } from "./types";
import { MatchFinder } from "../../../../contexts/matchmaker/application/get-matches/MatchFinder";
import { MemoryMatchRepository } from "../../../../contexts/matchmaker/infrastructure/MemoryMatchRepository";
import { MatchPutController } from "../controllers/MatchPutController";
import { MatchCreator } from "../../../../contexts/matchmaker/application/get-matches/MatchCreator";
import { InMemoryAsyncEventBus } from "../../../../contexts/_shared/infrastructure/bus/event/InMemoryAsyncEventBus";
import { EventLogger } from "../../../../contexts/_shared/application/EventLogger";
import { AllEventsHandler } from "../../../../contexts/_shared/application/AllEventsHandler";

export const container = new Container();

container.bind(types.Logger).to(ConsoleLogger).inSingletonScope();
container.bind(types.EventBus).to(InMemoryAsyncEventBus).inSingletonScope();

container.bind(EventLogger).to(EventLogger).inSingletonScope();
container.bind(types.EventHandler).to(AllEventsHandler).inSingletonScope();

container.bind(StatusGetController).toSelf().inSingletonScope();

container.bind(MatchGetController).toSelf().inSingletonScope();
container.bind(MatchPutController).toSelf().inSingletonScope();

container.bind(MatchFinder).toSelf().inSingletonScope();
container.bind(MatchCreator).toSelf().inSingletonScope();
container.bind(types.MatchRepository).to(MemoryMatchRepository).inSingletonScope();