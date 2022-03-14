import { interfaces } from "inversify";
import { MongoBackofficeCandidateTestRepository } from "../../../../test/contexts/backoffice/infrastructure/BackofficeCandidateTestRepositroy";
import { MongoBackofficeCandidateRepository } from "../../../contexts/backoffice/candidate/infrastructure/MongoBackofficeCandidateRepository";
import { MongoCardRepository } from "../../../contexts/backoffice/card/infrastructure/MongoCardRepository";
import { MemoryCardRepository } from "../../../contexts/matchmaker/card/infrastructure/MemoryCardRepository";
import { MemoryConversationRepository } from "../../../contexts/_shared/infrastructure/chat/MemoryConversationRepository";
import { MongoConversationRepository } from "../../../contexts/_shared/infrastructure/chat/MongoConversationRepository";
import { sharedTypes } from "../../_shared/ioc/sharedTypes";
import { types } from "./types";

export function setupEnvDependencies(container: interfaces.Container) {
  unbind(container);
  bind(container);
}

function unbind(container: interfaces.Container) {
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

function bind(container: interfaces.Container) {
  if (["test", "development"].includes(process.env.NODE_ENV!)) {
    container.bind(sharedTypes.CardRepository).to(MemoryCardRepository).inSingletonScope();
    container.bind(sharedTypes.ConversationRepository).to(MemoryConversationRepository).inSingletonScope();
    container.bind(types.CandidateRepository).to(MongoBackofficeCandidateTestRepository).inSingletonScope();
  }

  else if (["acceptance"].includes(process.env.NODE_ENV!)) {
    container.bind(sharedTypes.CardRepository).to(MongoCardRepository).inSingletonScope();
    container.bind(sharedTypes.ConversationRepository).to(MongoConversationRepository).inSingletonScope();
    container.bind(types.CandidateRepository).to(MongoBackofficeCandidateTestRepository).inSingletonScope();
  }
  else {
    container.bind(sharedTypes.CardRepository).to(MongoCardRepository).inSingletonScope();
    container.bind(sharedTypes.ConversationRepository).to(MongoConversationRepository).inSingletonScope();
    container.bind(types.CandidateRepository).to(MongoBackofficeCandidateRepository).inSingletonScope();
  }
}
