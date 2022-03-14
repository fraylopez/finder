import { Container } from "inversify";
import { MemoryCandidateRepository } from "../../../contexts/matchmaker/candidate/infrastructure/MemoryCandidateRepository";
import { MongoCandidateRepository } from "../../../contexts/matchmaker/candidate/infrastructure/MongoCandidateRepository";
import { MemoryCardRepository } from "../../../contexts/matchmaker/card/infrastructure/MemoryCardRepository";
import { MongoCardRepository } from "../../../contexts/backoffice/card/infrastructure/MongoCardRepository";
import { sharedTypes } from "../../_shared/ioc/sharedTypes";
import { types } from "./types";

export function setupEnvDependencies(container: Container) {
  if (container.isBound(sharedTypes.CardRepository)) {
    container.unbind(sharedTypes.CardRepository);
  }
  if (container.isBound(types.CandidateRepository)) {
    container.unbind(types.CandidateRepository);
  }

  if (["test,development"].includes(process.env.NODE_ENV!)) {
    container.bind(sharedTypes.CardRepository).to(MemoryCardRepository).inSingletonScope();
    container.bind(types.CandidateRepository).to(MemoryCandidateRepository).inSingletonScope();
  }

  else if (["acceptance"].includes(process.env.NODE_ENV!)) {
    container.bind(sharedTypes.CardRepository).to(MongoCardRepository).inSingletonScope();
    container.bind(types.CandidateRepository).to(MongoCandidateRepository).inSingletonScope();
  }
  else {
    container.bind(sharedTypes.CardRepository).to(MongoCardRepository).inSingletonScope();
    container.bind(types.CandidateRepository).to(MongoCandidateRepository).inSingletonScope();
  }
}