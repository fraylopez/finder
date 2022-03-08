import assert from "assert";
import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/matchmaker/backend/ioc/types";
import { Uuid } from "../../../../_shared/domain/value-object/Uuid";
import { CandidateRepository } from "../../domain/CandidateRepository";
import { CandidateLine } from "../../domain/chatbot/CandidateLine";
import { ConversationFactory } from "../../domain/chatbot/ConversationFactory";
import { Line } from "../../domain/chatbot/Line";


@injectable()
export class ChatManager {
  constructor(
    @inject(types.CandidateRepository) private readonly candidateRepository: CandidateRepository,
  ) { }

  async start(uid: string) {
    const candidate = await this.candidateRepository.find(new Uuid(uid));
    assert(candidate, "Unknown candidate");
    candidate.startChat(ConversationFactory.get("test")!);
  }

  async respond(uid: string, responseId: string, message?: string) {
    const candidate = await this.candidateRepository.find(new Uuid(uid));
    assert(candidate, "Unknown candidate");
    candidate.talk(new CandidateLine(responseId, message));
  }
}
