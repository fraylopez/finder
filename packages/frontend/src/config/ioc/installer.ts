import { types } from "./types";
import { HttpCardRepository } from "../../contexts/matchmaker/card/infrastructure/HttpCardRepository";
import { CardFinder } from "../../contexts/matchmaker/card/application/get-cards/CardFinder";
import { MatchUpdater } from "../../contexts/matchmaker/candidate/application/MatchUpdater";
import { WebSocketClient } from "../../contexts/_core/infrastructure/WebSocketClient";
import { CandidateCreator } from "../../contexts/matchmaker/candidate/application/CandidateCreator";
import { CandidateFinder } from "../../contexts/matchmaker/candidate/application/CandidateFinder";
import { SwipeCreator } from "../../contexts/matchmaker/candidate/application/SwipeCreator";
import { HttpSwipeService } from "../../contexts/matchmaker/candidate/infrastructure/HttpSwipeService";
import { CompositeCandidateRepository } from "../../contexts/matchmaker/candidate/infrastructure/CompositeCandidateRepository";
import { MapContainer } from "./MapContainer";
import { InMemoryEventBus } from "../../contexts/_core/infrastructure/InMemoryEventBus";
import { ConnectUpdateServiceOnCandidateCreatedEventHandler } from "../../contexts/matchmaker/candidate/application/SubscribeToMatchOnCandidateCreatedEventHandler";
import { ChatUpdater } from "../../contexts/matchmaker/chat/application/ChatUpdater";
import { ChatFinder } from "../../contexts/matchmaker/chat/application/ChatFinder";
import { ChatCreator } from "../../contexts/matchmaker/chat/application/ChatCreator";
import { WebSocketChatService } from "../../contexts/matchmaker/chat/infrastructure/WebSocketChatService";

const container = new MapContainer();

// container.bind(types.BaseHttpUrl, "http://10.1.0.238:3000");
// container.bind(types.BaseWsUrl, "ws://10.1.0.238:3000");
// container.bind(types.BaseHttpUrl, "http://10.1.0.111.nip.io:3000");
// container.bind(types.BaseWsUrl, "ws://10.1.0.111.nip.io:3000");
container.bind(types.BaseHttpUrl, "http://localhost:3000");
container.bind(types.BaseWsUrl, "ws://localhost:3000");

container.bind(types.EventBus, new InMemoryEventBus());
container.bind(types.WebSocketService, new WebSocketClient(container.get(types.BaseWsUrl)));

container.bind(types.CardRepository, new HttpCardRepository(container.get(types.BaseHttpUrl)));
container.bind(CardFinder, new CardFinder(container.get(types.CardRepository)));

container.bind(WebSocketClient, new WebSocketClient(container.get(types.BaseWsUrl)));
container.bind(MatchUpdater, new MatchUpdater(container.get(WebSocketClient)));

container.bind(types.CandidateRepository, new CompositeCandidateRepository(container.get(types.BaseHttpUrl)));
container.bind(CandidateCreator, new CandidateCreator(container.get(types.CandidateRepository), container.get(types.EventBus)));
container.bind(CandidateFinder, new CandidateFinder(container.get(types.CandidateRepository)));

container.bind(types.SwipeService, new HttpSwipeService(container.get(types.BaseHttpUrl)));
container.bind(SwipeCreator, new SwipeCreator(container.get(types.SwipeService)));

container.bind(types.EventHandler, new ConnectUpdateServiceOnCandidateCreatedEventHandler(container.get(types.WebSocketService)));


// container.bind(types.ChatService, new HttpChatService(container.get(types.BaseHttpUrl)));
container.bind(types.ChatService, new WebSocketChatService(container.get(types.BaseHttpUrl), container.get(types.WebSocketService)));
container.bind(ChatUpdater, new ChatUpdater(container.get(types.WebSocketService)));
container.bind(ChatFinder, new ChatFinder(container.get(types.ChatService)));
container.bind(ChatCreator, new ChatCreator(container.get(types.ChatService)));



export { container };
