import { Container } from "inversify";
import { MemoryCandidateRepository } from "../../../contexts/matchmaker/candidate/infrastructure/MemoryCandidateRepository";
import { MongoCandidateRepository } from "../../../contexts/matchmaker/candidate/infrastructure/MongoCandidateRepository";
import { MemoryCardRepository } from "../../../contexts/matchmaker/card/infrastructure/MemoryCardRepository";
import { MongoCardRepository } from "../../../contexts/backoffice/card/infrastructure/MongoCardRepository";
import { types } from "./types";

export function setupEnvDependencies(container: Container) {
  if (container.isBound(types.CardRepository)) {
    container.unbind(types.CardRepository);
    container.unbind(types.CandidateRepository);
  }

  if (["test,development"].includes(process.env.NODE_ENV!)) {
    container.bind(types.CardRepository).to(MemoryCardRepository).inSingletonScope();
    container.bind(types.CandidateRepository).to(MemoryCandidateRepository).inSingletonScope();
  }

  else if (["acceptance"].includes(process.env.NODE_ENV!)) {
    container.bind(types.CardRepository).to(MongoCardRepository).inSingletonScope();
    container.bind(types.CandidateRepository).to(MongoCandidateRepository).inSingletonScope();
  }
  else {
    container.bind(types.CardRepository).to(MongoCardRepository).inSingletonScope();
    container.bind(types.CandidateRepository).to(MongoCandidateRepository).inSingletonScope();
  }
}