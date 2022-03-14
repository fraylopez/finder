import { Container } from "inversify";
import { InMemoryAsyncEventBus } from "../../../contexts/_core/infrastructure/bus/event/InMemoryAsyncEventBus";
import { ConsoleLogger } from "../../../contexts/_core/infrastructure/logger/ConsoleLogger";
import { MongoClientFactory } from "../../../contexts/_core/infrastructure/persistence/mongo/MongoClientFactory";
import { coreTypes } from "./coreTypes";

const container = new Container();
// Core
container.bind(coreTypes.Logger).to(ConsoleLogger).inSingletonScope();
container.bind(coreTypes.EventBus).to(InMemoryAsyncEventBus).inSingletonScope();
container.bind(MongoClientFactory).to(MongoClientFactory).inSingletonScope();


export function getContainer() {
  const child = new Container();
  return Container.merge(child, container);
}