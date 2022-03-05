import "reflect-metadata";
import { Container } from "inversify";
import { ConsoleLogger } from "../../../../contexts/_shared/infrastructure/logger/ConsoleLogger";
import { MatchGetController } from "../controllers/MatchGetController";
import StatusGetController from "../controllers/StatusGetController";
import { types } from "./types";
import { MatchFinder } from "../../../../contexts/matchmaker/application/get-matches/MatchFinder";
import { MemoryMatchRepository } from "../../../../contexts/matchmaker/infrastructure/MemoryMatchRepository";

export const container = new Container();

container.bind(types.Logger).to(ConsoleLogger).inSingletonScope();

container.bind(StatusGetController).toSelf().inSingletonScope();

container.bind(MatchGetController).toSelf().inSingletonScope();

container.bind(MatchFinder).toSelf().inSingletonScope();
container.bind(types.MatchRepository).to(MemoryMatchRepository).inSingletonScope();