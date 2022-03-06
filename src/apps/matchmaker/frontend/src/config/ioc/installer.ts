import { types } from "./types";
import { HttpMatchRepository } from "../../contexts/matchmaker/infrastructure/HttpMatchRepository";
import { MatchFinder } from "../../contexts/matchmaker/application/get-matches/MatchFinder";
import { MatchUpdater } from "../../contexts/matchmaker/application/get-matches/MatchUpdater";
import { MatchWebsocketClient } from "../../contexts/matchmaker/infrastructure/MatchWebsocketClient";

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

container.bind(types.MatchRepository, new HttpMatchRepository("http://localhost:3000"));
container.bind(MatchFinder, new MatchFinder(container.get(types.MatchRepository)));

container.bind(MatchWebsocketClient, new MatchWebsocketClient("ws://localhost:8999"));
container.bind(MatchUpdater, new MatchUpdater(container.get(MatchWebsocketClient)));

export { container };