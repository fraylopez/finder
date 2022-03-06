import "reflect-metadata";
import { Container } from "inversify";
import { ConsoleLogger } from "../../../../contexts/_shared/infrastructure/logger/ConsoleLogger";
import { MatchGetController } from "../controllers/MatchGetController";
import StatusGetController from "../controllers/StatusGetController";
import { types } from "./types";
import { MatchFinder } from "../../../../contexts/matchmaker/match/application/get-matches/MatchFinder";
import { MemoryMatchRepository } from "../../../../contexts/matchmaker/match/infrastructure/MemoryMatchRepository";
import { MatchPutController } from "../controllers/MatchPutController";
import { MatchCreator } from "../../../../contexts/matchmaker/match/application/get-matches/MatchCreator";
import { InMemoryAsyncEventBus } from "../../../../contexts/_shared/infrastructure/bus/event/InMemoryAsyncEventBus";
import { EventLogger } from "../../../../contexts/_shared/application/EventLogger";
import { AllEventsHandler } from "../../../../contexts/_shared/application/AllEventsHandler";
import { SwipePutController } from "../controllers/SwipePutController";
import { SwipeCreator } from "../../../../contexts/matchmaker/candidate/application/swipe/SwipeCreator";
import { CandidateCreator } from "../../../../contexts/matchmaker/candidate/application/add/CandidateCreator";
import { CandidatePutController } from "../controllers/CandidatePutController";
import { MemoryCandidateRepository } from "../../../../contexts/matchmaker/candidate/infrastructure/MemoryCandidateRepository";

export const container = new Container();

// Shared
container.bind(types.Logger).to(ConsoleLogger).inSingletonScope();
container.bind(types.EventBus).to(InMemoryAsyncEventBus).inSingletonScope();

container.bind(EventLogger).to(EventLogger).inSingletonScope();
container.bind(types.EventHandler).to(AllEventsHandler).inSingletonScope();

// Status
container.bind(StatusGetController).toSelf().inSingletonScope();

// Match
container.bind(MatchGetController).toSelf().inSingletonScope();
container.bind(MatchPutController).toSelf().inSingletonScope();

container.bind(MatchFinder).toSelf().inSingletonScope();
container.bind(MatchCreator).toSelf().inSingletonScope();
container.bind(types.MatchRepository).to(MemoryMatchRepository).inSingletonScope();

// Candidate
container.bind(CandidatePutController).toSelf().inSingletonScope();
container.bind(SwipePutController).toSelf().inSingletonScope();

container.bind(CandidateCreator).toSelf().inSingletonScope();
container.bind(SwipeCreator).toSelf().inSingletonScope();
container.bind(types.CandidadteRepository).to(MemoryCandidateRepository).inSingletonScope();
