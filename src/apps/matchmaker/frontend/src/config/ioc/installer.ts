import { types } from "./types";
import { HttpCardRepository } from "../../contexts/matchmaker/infrastructure/HttpCardRepository";
import { CardFinder } from "../../contexts/matchmaker/card/application/get-cards/CardFinder";
import { MatchUpdater } from "../../contexts/matchmaker/candidate/application/MatchUpdater";
import { MatchWebSocketClient } from "../../contexts/matchmaker/infrastructure/MatchWebSocketClient";
import { CandidateCreator } from "../../contexts/matchmaker/candidate/application/CandidateCreator";
import { MemoryCandidateRepository } from "../../contexts/matchmaker/candidate/infrastructure/MemoryCandidateRepository";
import { CandidateFinder } from "../../contexts/matchmaker/candidate/application/CandidateFinder";
import { SwipeCreator } from "../../contexts/matchmaker/candidate/application/SwipeCreator";
import { HttpSwipeService } from "../../contexts/matchmaker/candidate/infrastructure/HttpSwipeService";
import { CompositeCandidateRepository } from "../../contexts/matchmaker/candidate/infrastructure/CompositeCandidateRepository";

// const container = new Container();

// container.bind(MatchFinder).toSelf().inSingletonScope();
// container.bind(types.MatchRepository).to(HttpMatchRepository).inSingletonScope();

// export { container };

type Newable<T> = new (...args: never[]) => T;
interface Abstract<T> {
  prototype: T;
}
type ServiceIdentifier<T = unknown> = (string | symbol | Newable<T> | Abstract<T>);
class MapContainer {
  private map: Map<any, any>;
  constructor() {
    this.map = new Map();
  }

  bind(id: any, service: any) {
    this.map.set(id, service);
  }
  get<T>(id: ServiceIdentifier<T>) {
    return this.map.get(id) as T;
  }
}

const container = new MapContainer();

container.bind(types.BaseHttpUrl, "http://localhost:3000");
container.bind(types.BaseWsUrl, "ws://localhost:3000");
container.bind(types.CardRepository, new HttpCardRepository(container.get(types.BaseHttpUrl)));
container.bind(CardFinder, new CardFinder(container.get(types.CardRepository)));

container.bind(MatchWebSocketClient, new MatchWebSocketClient(container.get(types.BaseWsUrl)));
container.bind(MatchUpdater, new MatchUpdater(container.get(MatchWebSocketClient)));

container.bind(types.CandidateRepository, new CompositeCandidateRepository(container.get(types.BaseHttpUrl)));
container.bind(CandidateCreator, new CandidateCreator(container.get(types.CandidateRepository)));
container.bind(CandidateFinder, new CandidateFinder(container.get(types.CandidateRepository)));

container.bind(types.SwipeService, new HttpSwipeService(container.get(types.BaseHttpUrl)));
container.bind(SwipeCreator, new SwipeCreator(container.get(types.SwipeService)));
export { container };