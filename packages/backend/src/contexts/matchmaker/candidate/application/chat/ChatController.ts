import assert from "assert";
import { inject, injectable } from "inversify";
import { types } from "../../../../../apps/backend/ioc/types";
import { Uuid } from "../../../../_shared/domain/value-object/Uuid";
import { CandidateRepository } from "../../domain/CandidateRepository";
import { CandidateLine } from "../../domain/chatbot/CandidateLine";
import { ConversationFactory } from "../../domain/chatbot/ConversationFactory";
import { ChatItemSender } from "../../domain/ConversationItemSender";
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
    @inject(types.ConversationItemSender) private readonly conversationItemSender: ChatItemSender,
  ) { }

  async start(uid: string) {
    const candidate = await this.findCandidate(uid);
    const startMessage = candidate.startChat(ConversationFactory.get("test")!);
    this.conversationItemSender.send(startMessage);
  }

  async talk({ uid, responseId, message }: TalkParams) {
    const candidate = await this.findCandidate(uid);
    const currentMessage = candidate.talk(new CandidateLine(responseId, message));
    this.conversationItemSender.send(currentMessage);
  }

  private async findCandidate(uid: string) {
    const candidate = await this.candidateRepository.find(new Uuid(uid));
    assert(candidate, new UnknownCandidateError(uid));
    assert(candidate.getIsMatch(), new CandidateIsNotMatchError(uid));
    return candidate;
  }
}
