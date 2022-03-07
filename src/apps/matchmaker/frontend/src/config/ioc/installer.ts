import { types } from "./types";
import { HttpCardRepository } from "../../contexts/matchmaker/infrastructure/HttpCardRepository";
import { CardFinder } from "../../contexts/matchmaker/application/get-cards/CardFinder";
import { CardUpdater } from "../../contexts/matchmaker/application/get-cards/CardUpdater";
import { CardWebsocketClient } from "../../contexts/matchmaker/infrastructure/CardWebsocketClient";

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

container.bind(types.CardRepository, new HttpCardRepository("http://localhost:3000"));
container.bind(CardFinder, new CardFinder(container.get(types.CardRepository)));

container.bind(CardWebsocketClient, new CardWebsocketClient("ws://localhost:8999"));
container.bind(CardUpdater, new CardUpdater(container.get(CardWebsocketClient)));

export { container };