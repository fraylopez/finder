import "reflect-metadata";
import { types } from "./types";
import { CardFinder } from "../../../contexts/matchmaker/card/application/get-cards/CardFinder";
import { EventLogger } from "../../../contexts/_shared/application/EventLogger";
import { LogAllEventsHandler } from "../../../contexts/_shared/application/LogAllEventsHandler";
import { SwipeCreator } from "../../../contexts/matchmaker/candidate/application/swipe/SwipeCreator";
import { CandidateCreator } from "../../../contexts/matchmaker/candidate/application/add/CandidateCreator";
import { CandidatePutController } from "../controllers/http/CandidatePutController";
import { ExposeSwipeOnSwipeCreatedEventHandler } from "../../../contexts/matchmaker/candidate/application/swipe/ExposeSwipeOnSwipeCreatedEventHandler";
import { WebSocketCandidateEventExposer } from "../../../contexts/matchmaker/candidate/infrastructure/WebSocketCandidateEventExposer";
import { EvaluateOnCandidateScoreUpdatedEvent } from "../../../contexts/matchmaker/candidate/application/swipe/EvaluateCandidateOnScoreUpdated";
import { CandidateEvaluator } from "../../../contexts/matchmaker/candidate/application/swipe/CandidateEvaluator";
import { ScoreMatchEvaluator } from "../../../contexts/matchmaker/candidate/domain/ScoreMatchEvaluator";
import { StartChatOnMatchCreatedEvent } from "../../../contexts/matchmaker/candidate/application/chat/StartChatOnMatchCreatedEvent";
import { ChatController } from "../../../contexts/matchmaker/candidate/application/chat/ChatController";
import { WebSocketServer } from "../../../contexts/_core/infrastructure/WebSocketServer";
import { WebSocketChatItemSender } from "../../../contexts/matchmaker/candidate/infrastructure/WebSocketChatItemSender";
import { MailUpdater } from "../../../contexts/matchmaker/candidate/application/update/MailUpdater";
import { setupEnvDependencies } from "./env-config";
import { sharedTypes } from "../../_shared/ioc/sharedTypes";
import { coreTypes } from "../../_core/ioc/coreTypes";
import { MongoCardRepository } from "../../../contexts/backoffice/card/infrastructure/MongoCardRepository";
import { MongoCandidateRepository } from "../../../contexts/matchmaker/candidate/infrastructure/MongoCandidateRepository";
import { getContainer } from "../../_core/ioc/installer";
import { ChatFinder } from "../../../contexts/matchmaker/candidate/application/chat/ChatFinder";
import { ChatGetController } from "../controllers/http/ChatGetController";
import { ChatPutController } from "../controllers/http/ChatPutController";
import { MailPatchController } from "../controllers/http/MailPatchController";
import { StatusGetController } from "../controllers/http/StatusGetController";
import { SwipePutController } from "../controllers/http/SwipePutController";
import { CardGetController } from "../controllers/http/CardGetController";
import { IncomingUserChatMessageController } from "../controllers/ws/IncomingUserChatMessageController";

export const container = getContainer();

// Shared
container.bind(sharedTypes.CardRepository).to(MongoCardRepository).inSingletonScope();

// Websocket
container.bind(types.WebSocketServer).to(WebSocketServer).inSingletonScope();
container.bind(types.EventExposer).to(WebSocketCandidateEventExposer).inSingletonScope();

// Event Logger
container.bind(EventLogger).to(EventLogger).inSingletonScope();
container.bind(coreTypes.EventHandler).to(LogAllEventsHandler).inSingletonScope();

// Status
container.bind(StatusGetController).toSelf().inSingletonScope();

// Card
container.bind(CardGetController).toSelf().inSingletonScope();
container.bind(CardFinder).toSelf().inSingletonScope();

// Candidate
// http
container.bind(CandidatePutController).toSelf().inSingletonScope();
container.bind(SwipePutController).toSelf().inSingletonScope();
container.bind(CandidateEvaluator).toSelf().inSingletonScope();
container.bind(ChatPutController).toSelf().inSingletonScope();
container.bind(MailPatchController).toSelf().inSingletonScope();
container.bind(ChatGetController).toSelf().inSingletonScope();
// ws
container.bind(IncomingUserChatMessageController).toSelf().inSingletonScope();

container.bind(CandidateCreator).toSelf().inSingletonScope();
container.bind(SwipeCreator).toSelf().inSingletonScope();
container.bind(ChatController).toSelf().inSingletonScope();
container.bind(MailUpdater).toSelf().inSingletonScope();
container.bind(ChatFinder).toSelf().inSingletonScope();

container.bind(types.MatchEvaluator).to(ScoreMatchEvaluator).inSingletonScope();
container.bind(types.ConversationItemSender).to(WebSocketChatItemSender).inSingletonScope();

container.bind(coreTypes.EventHandler).to(ExposeSwipeOnSwipeCreatedEventHandler).inSingletonScope();
container.bind(coreTypes.EventHandler).to(EvaluateOnCandidateScoreUpdatedEvent).inSingletonScope();
container.bind(coreTypes.EventHandler).to(StartChatOnMatchCreatedEvent).inSingletonScope();
container.bind(types.CandidateRepository).to(MongoCandidateRepository).inSingletonScope();

setupEnvDependencies(container);