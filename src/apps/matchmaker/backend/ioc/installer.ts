import "reflect-metadata";
import { Container } from "inversify";
import { ConsoleLogger } from "../../../../contexts/_shared/infrastructure/logger/ConsoleLogger";
import { CardGetController } from "../controllers/CardGetController";
import StatusGetController from "../controllers/StatusGetController";
import { types } from "./types";
import { CardFinder } from "../../../../contexts/matchmaker/card/application/get-cards/CardFinder";
import { MemoryCardRepository } from "../../../../contexts/matchmaker/card/infrastructure/MemoryCardRepository";
import { CardPutController } from "../controllers/CardPutController";
import { CardCreator } from "../../../../contexts/matchmaker/card/application/get-cards/CardCreator";
import { InMemoryAsyncEventBus } from "../../../../contexts/_shared/infrastructure/bus/event/InMemoryAsyncEventBus";
import { EventLogger } from "../../../../contexts/_shared/application/EventLogger";
import { AllEventsHandler } from "../../../../contexts/_shared/application/AllEventsHandler";
import { SwipePutController } from "../controllers/SwipePutController";
import { SwipeCreator } from "../../../../contexts/matchmaker/candidate/application/swipe/SwipeCreator";
import { CandidateCreator } from "../../../../contexts/matchmaker/candidate/application/add/CandidateCreator";
import { CandidatePutController } from "../controllers/CandidatePutController";
import { MemoryCandidateRepository } from "../../../../contexts/matchmaker/candidate/infrastructure/MemoryCandidateRepository";
import { ExposeSwipeOnSwipeCreatedEventHandler } from "../../../../contexts/matchmaker/candidate/application/swipe/ExposeSwipeOnSwipeCreatedEventHandler";
import { WebSocketEventExposer } from "../../../../contexts/matchmaker/candidate/infrastructure/WebSocketEventExposer";

export const container = new Container();

// Shared
container.bind(types.Logger).to(ConsoleLogger).inSingletonScope();
container.bind(types.EventBus).to(InMemoryAsyncEventBus).inSingletonScope();

container.bind(EventLogger).to(EventLogger).inSingletonScope();
container.bind(types.EventHandler).to(AllEventsHandler).inSingletonScope();
container.bind(types.EventExposer).to(WebSocketEventExposer).inSingletonScope();

// Status
container.bind(StatusGetController).toSelf().inSingletonScope();

// Card
container.bind(CardGetController).toSelf().inSingletonScope();
container.bind(CardPutController).toSelf().inSingletonScope();

container.bind(CardFinder).toSelf().inSingletonScope();
container.bind(CardCreator).toSelf().inSingletonScope();
container.bind(types.CardRepository).to(MemoryCardRepository).inSingletonScope();

// Candidate
container.bind(CandidatePutController).toSelf().inSingletonScope();
container.bind(SwipePutController).toSelf().inSingletonScope();

container.bind(CandidateCreator).toSelf().inSingletonScope();
container.bind(SwipeCreator).toSelf().inSingletonScope();
container.bind(types.CandidadteRepository).to(MemoryCandidateRepository).inSingletonScope();

container.bind(types.EventHandler).to(ExposeSwipeOnSwipeCreatedEventHandler).inSingletonScope();
