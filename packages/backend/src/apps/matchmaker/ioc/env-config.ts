import { Container } from "inversify";
import { MemoryCandidateRepository } from "../../../contexts/matchmaker/candidate/infrastructure/MemoryCandidateRepository";
import { MongoCandidateRepository } from "../../../contexts/matchmaker/candidate/infrastructure/MongoCandidateRepository";
import { MemoryCardRepository } from "../../../contexts/matchmaker/card/infrastructure/MemoryCardRepository";
import { MongoCardRepository } from "../../../contexts/backoffice/card/infrastructure/MongoCardRepository";
import { sharedTypes } from "../../_shared/ioc/sharedTypes";
import { types } from "./types";
import { MemoryConversationRepository } from "../../../contexts/_shared/infrastructure/chat/MemoryConversationRepository";
import { MongoConversationRepository } from "../../../contexts/_shared/infrastructure/chat/MongoConversationRepository";

export function setupEnvDependencies(container: Container) {
  unbind(container);
  bind(container);
}


function unbind(container: Container) {
  if (container.isBound(sharedTypes.CardRepository)) {
    container.unbind(sharedTypes.CardRepository);
  }
  if (container.isBound(sharedTypes.ConversationRepository)) {
    container.unbind(sharedTypes.ConversationRepository);
  }
  if (container.isBound(types.CandidateRepository)) {
    container.unbind(types.CandidateRepository);
  }
}

function bind(container: Container) {
  if (["test", "development"].includes(process.env.NODE_ENV!)) {
    container.bind(sharedTypes.CardRepository).to(MemoryCardRepository).inSingletonScope();
    container.bind(sharedTypes.ConversationRepository).to(MemoryConversationRepository).inSingletonScope();
    container.bind(types.CandidateRepository).to(MemoryCandidateRepository).inSingletonScope();
  }

  else if (["acceptance"].includes(process.env.NODE_ENV!)) {
    container.bind(sharedTypes.CardRepository).to(MongoCardRepository).inSingletonScope();
    container.bind(sharedTypes.ConversationRepository).to(MongoConversationRepository).inSingletonScope();
    container.bind(types.CandidateRepository).to(MongoCandidateRepository).inSingletonScope();
  }
  else {
    container.bind(sharedTypes.CardRepository).to(MongoCardRepository).inSingletonScope();
    container.bind(sharedTypes.ConversationRepository).to(MongoConversationRepository).inSingletonScope();
    container.bind(types.CandidateRepository).to(MongoCandidateRepository).inSingletonScope();
  }
}
