import "reflect-metadata";
import { Container } from "inversify";
import { ConsoleLogger } from "../../../contexts/_shared/infrastructure/logger/ConsoleLogger";
import { CardGetController } from "../controllers/CardGetController";
import { types } from "./types";
import { CardFinder } from "../../../contexts/matchmaker/card/application/get-cards/CardFinder";
import { MemoryCardRepository } from "../../../contexts/matchmaker/card/infrastructure/MemoryCardRepository";
import { CardPutController } from "../controllers/CardPutController";
import { CardCreator } from "../../../contexts/matchmaker/card/application/get-cards/CardCreator";
import { InMemoryAsyncEventBus } from "../../../contexts/_shared/infrastructure/bus/event/InMemoryAsyncEventBus";
import { EventLogger } from "../../../contexts/_shared/application/EventLogger";
import { AllEventsHandler } from "../../../contexts/_shared/application/AllEventsHandler";
import { SwipePutController } from "../controllers/SwipePutController";
import { SwipeCreator } from "../../../contexts/matchmaker/candidate/application/swipe/SwipeCreator";
import { CandidateCreator } from "../../../contexts/matchmaker/candidate/application/add/CandidateCreator";
import { CandidatePutController } from "../controllers/CandidatePutController";
import { MemoryCandidateRepository } from "../../../contexts/matchmaker/candidate/infrastructure/MemoryCandidateRepository";
import { ExposeSwipeOnSwipeCreatedEventHandler } from "../../../contexts/matchmaker/candidate/application/swipe/ExposeSwipeOnSwipeCreatedEventHandler";
import { WebSocketEventExposer } from "../../../contexts/matchmaker/candidate/infrastructure/WebSocketEventExposer";
import { EvaluateOnCandidateScoreUpdatedEvent } from "../../../contexts/matchmaker/candidate/application/swipe/EvaluateCandidateOnScoreUpdated";
import { CandidateEvaluator } from "../../../contexts/matchmaker/candidate/application/swipe/CandidateEvaluator";
import { ScoreMatchEvaluator } from "../../../contexts/matchmaker/candidate/domain/ScoreMatchEvaluator";
import { StartChatOnMatchCreatedEvent } from "../../../contexts/matchmaker/candidate/application/chat/StartChatOnMatchCreatedEvent";
import { ChatController } from "../../../contexts/matchmaker/candidate/application/chat/ChatController";
import { ConversationPutController } from "../controllers/ConversationPutController";
import { StatusGetController } from "../controllers/StatusGetController";
import { WebSocketServer } from "../../../contexts/_shared/infrastructure/WebSocketServer";
import { WebSocketChatItemSender } from "../../../contexts/matchmaker/candidate/infrastructure/WebSocketChatItemSender";
import { MailPatchController } from "../controllers/MailPatchController";
import { MailUpdater } from "../../../contexts/matchmaker/candidate/application/update/MailUpdater";

export const container = new Container();

// Shared
container.bind(types.Logger).to(ConsoleLogger).inSingletonScope();
container.bind(types.EventBus).to(InMemoryAsyncEventBus).inSingletonScope();

container.bind(EventLogger).to(EventLogger).inSingletonScope();
container.bind(types.EventHandler).to(AllEventsHandler).inSingletonScope();
container.bind(types.EventExposer).to(WebSocketEventExposer).inSingletonScope();
container.bind(types.WebSocketServer).to(WebSocketServer).inSingletonScope();

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
container.bind(CandidateEvaluator).toSelf().inSingletonScope();
container.bind(ConversationPutController).toSelf().inSingletonScope();
container.bind(MailPatchController).toSelf().inSingletonScope();

container.bind(CandidateCreator).toSelf().inSingletonScope();
container.bind(SwipeCreator).toSelf().inSingletonScope();
container.bind(ChatController).toSelf().inSingletonScope();
container.bind(MailUpdater).toSelf().inSingletonScope();

container.bind(types.MatchEvaluator).to(ScoreMatchEvaluator).inSingletonScope();
container.bind(types.ConversationItemSender).to(WebSocketChatItemSender).inSingletonScope();
container.bind(types.CandidateRepository).to(MemoryCandidateRepository).inSingletonScope();

container.bind(types.EventHandler).to(ExposeSwipeOnSwipeCreatedEventHandler).inSingletonScope();
container.bind(types.EventHandler).to(EvaluateOnCandidateScoreUpdatedEvent).inSingletonScope();
container.bind(types.EventHandler).to(StartChatOnMatchCreatedEvent).inSingletonScope();
container.bind(types.EventHandler).to(StartChatOnMatchCreatedEvent).inSingletonScope();
