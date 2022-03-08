import assert from "assert";
import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/matchmaker/backend/ioc/types";
import { Uuid } from "../../../../_shared/domain/value-object/Uuid";
import { CandidateRepository } from "../../domain/CandidateRepository";
import { CandidateLine } from "../../domain/chatbot/CandidateLine";
import { ConversationFactory } from "../../domain/chatbot/ConversationFactory";
import { CandidateIsNotMatchError } from "../../domain/errors/CandidateIsNotMatchError";
import { UnknownCandidateError } from "../../domain/errors/UnknownCandidateError";

interface TalkParams {
  uid: string,
  responseId: string,
  message?: string;
}

@injectable()
export class ChatController {
  constructor(
    @inject(types.CandidateRepository) private readonly candidateRepository: CandidateRepository,
  ) { }

  async start(uid: string) {
    const candidate = await this.candidateRepository.find(new Uuid(uid));
    assert(candidate, new UnknownCandidateError(uid));
    candidate.startChat(ConversationFactory.get("test")!);
  }

  async talk({ uid, responseId, message }: TalkParams) {
    const candidate = await this.candidateRepository.find(new Uuid(uid));
    assert(candidate, new UnknownCandidateError(uid));
    assert(candidate.getIsMatch(), new CandidateIsNotMatchError(uid));
    candidate.talk(new CandidateLine(responseId, message));
  }
}
