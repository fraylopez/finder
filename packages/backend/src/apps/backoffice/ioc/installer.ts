import { Container } from "inversify";
import "reflect-metadata";
import { CardCreator } from "../../../contexts/backoffice/card/application/create/CardCreator";
import { CandidateFinder } from "../../../contexts/backoffice/candidate/application/find/CandidateFinder";
import { WebSocketCandidateEventExposer } from "../../../contexts/matchmaker/candidate/infrastructure/WebSocketCandidateEventExposer";
import { InMemoryAsyncEventBus } from "../../../contexts/_core/infrastructure/bus/event/InMemoryAsyncEventBus";
import { ConsoleLogger } from "../../../contexts/_core/infrastructure/logger/ConsoleLogger";
import { MongoClientFactory } from "../../../contexts/_core/infrastructure/persistence/mongo/MongoClientFactory";
import { WebSocketServer } from "../../../contexts/_core/infrastructure/WebSocketServer";
import { AllEventsHandler } from "../../../contexts/_shared/application/AllEventsHandler";
import { EventLogger } from "../../../contexts/_shared/application/EventLogger";
import { AllCandidatesGetController } from "../controllers/AllCandidatesGetController";
import { CandidateGetController } from "../controllers/CandidateGetController";
import { CardPutController } from "../controllers/CardPutController";
import { StatusGetController } from "../controllers/StatusGetController";
import { setupEnvDependencies } from "./env-config";
import { types } from "./types";
import { MongoBackofficeCandidateRepository } from "../../../contexts/backoffice/candidate/infrastructure/MongoBackofficeCandidateRepository";
import { MongoCardRepository } from "../../../contexts/backoffice/card/infrastructure/MongoCardRepository";

export const container = new Container();
// Shared
container.bind(types.Logger).to(ConsoleLogger).inSingletonScope();
container.bind(types.EventBus).to(InMemoryAsyncEventBus).inSingletonScope();

container.bind(EventLogger).to(EventLogger).inSingletonScope();
container.bind(types.EventHandler).to(AllEventsHandler).inSingletonScope();
container.bind(types.EventExposer).to(WebSocketCandidateEventExposer).inSingletonScope();
container.bind(types.WebSocketServer).to(WebSocketServer).inSingletonScope();
container.bind(MongoClientFactory).to(MongoClientFactory).inSingletonScope();

// Status
container.bind(StatusGetController).toSelf().inSingletonScope();

// Card
container.bind(CardPutController).toSelf().inSingletonScope();

container.bind(CardCreator).toSelf().inSingletonScope();

container.bind(types.CardRepository).to(MongoCardRepository).inSingletonScope();

// Candidate
container.bind(AllCandidatesGetController).toSelf().inSingletonScope();
container.bind(CandidateGetController).toSelf().inSingletonScope();

container.bind(CandidateFinder).toSelf().inSingletonScope();

container.bind(types.CandidateRepository).to(MongoBackofficeCandidateRepository).inSingletonScope();

setupEnvDependencies(container);