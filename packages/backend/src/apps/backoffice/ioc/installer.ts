import { Container } from "inversify";
import "reflect-metadata";
import { CardCreator } from "../../../contexts/backoffice/card/application/create/CardCreator";
import { CandidateFinder } from "../../../contexts/backoffice/candidate/application/find/CandidateFinder";
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
import { coreTypes } from "../../_core/ioc/coreTypes";
import { ChatCreator } from "../../../contexts/backoffice/chat/application/ChatCreator";
import { ChatUpdater } from "../../../contexts/backoffice/chat/application/ChatUpdater";
import { ConversationPostController } from "../controllers/ConversationPostController";
import { ConversationPatchController } from "../controllers/ConversationPatchController";
import { sharedTypes } from "../../_shared/ioc/sharedTypes";
import { MemoryConversationRepository } from "../../../contexts/_shared/infrastructure/chat/MemoryConversationRepository";

export const container = new Container();
// Core
container.bind(coreTypes.Logger).to(ConsoleLogger).inSingletonScope();
container.bind(coreTypes.EventBus).to(InMemoryAsyncEventBus).inSingletonScope();
container.bind(coreTypes.EventHandler).to(AllEventsHandler).inSingletonScope();

// Shared
container.bind(EventLogger).to(EventLogger).inSingletonScope();
container.bind(types.WebSocketServer).to(WebSocketServer).inSingletonScope();
container.bind(MongoClientFactory).to(MongoClientFactory).inSingletonScope();
container.bind(sharedTypes.CardRepository).to(MongoCardRepository).inSingletonScope();
container.bind(sharedTypes.ConversationRepository).to(MemoryConversationRepository).inSingletonScope();

// Status
container.bind(StatusGetController).toSelf().inSingletonScope();

// Card
container.bind(CardPutController).toSelf().inSingletonScope();
container.bind(CardCreator).toSelf().inSingletonScope();


// Candidate
container.bind(AllCandidatesGetController).toSelf().inSingletonScope();
container.bind(CandidateGetController).toSelf().inSingletonScope();

container.bind(CandidateFinder).toSelf().inSingletonScope();

container.bind(types.CandidateRepository).to(MongoBackofficeCandidateRepository).inSingletonScope();

// Chat
container.bind(ConversationPostController).toSelf().inSingletonScope();
container.bind(ConversationPatchController).toSelf().inSingletonScope();

container.bind(ChatCreator).toSelf().inSingletonScope();
container.bind(ChatUpdater).toSelf().inSingletonScope();

setupEnvDependencies(container);