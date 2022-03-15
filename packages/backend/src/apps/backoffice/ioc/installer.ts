import "reflect-metadata";
import { CardCreator } from "../../../contexts/backoffice/card/application/create/CardCreator";
import { BackofficeCandidateFinder } from "../../../contexts/backoffice/candidate/application/find/BackofficeCandidateFinder";
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
import { ConversationLinePatchController } from "../controllers/ConversationLinePatchController";
import { sharedTypes } from "../../_shared/ioc/sharedTypes";
import { MemoryConversationRepository } from "../../../contexts/_shared/infrastructure/chat/MemoryConversationRepository";
import { ConversationNestedPatchController } from "../controllers/ConversationNestedPatchController";
import { EventLogger } from "../../../contexts/_shared/application/EventLogger";
import { LogAllEventsHandler } from "../../../contexts/_shared/application/LogAllEventsHandler";
import { getContainer } from "../../_core/ioc/installer";

export const container = getContainer();

// Shared
container.bind(sharedTypes.CardRepository).to(MongoCardRepository).inSingletonScope();
container.bind(sharedTypes.ConversationRepository).to(MemoryConversationRepository).inSingletonScope();

// Event Logger
container.bind(EventLogger).to(EventLogger).inSingletonScope();
container.bind(coreTypes.EventHandler).to(LogAllEventsHandler).inSingletonScope();

// Status
container.bind(StatusGetController).toSelf().inSingletonScope();

// Card
container.bind(CardPutController).toSelf().inSingletonScope();
container.bind(CardCreator).toSelf().inSingletonScope();


// Candidate
container.bind(AllCandidatesGetController).toSelf().inSingletonScope();
container.bind(CandidateGetController).toSelf().inSingletonScope();

container.bind(BackofficeCandidateFinder).toSelf().inSingletonScope();

container.bind(types.CandidateRepository).to(MongoBackofficeCandidateRepository).inSingletonScope();

// Chat
container.bind(ConversationPostController).toSelf().inSingletonScope();
container.bind(ConversationLinePatchController).toSelf().inSingletonScope();
container.bind(ConversationNestedPatchController).toSelf().inSingletonScope();

container.bind(ChatCreator).toSelf().inSingletonScope();
container.bind(ChatUpdater).toSelf().inSingletonScope();

setupEnvDependencies(container);