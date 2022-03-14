import { AggregateRoot } from "../../../_core/domain/AggregateRoot";
import { Uuid } from "../../../_core/domain/value-object/Uuid";
import { MatchEvaluator } from "./MatchEvaluator";
import { CandidateCreatedEvent } from "./events/CandidateCreatedEvent";
import { Swipe } from "./Swipe";
import { Chat } from "./chat/Chat";
import { Line } from "../../../_shared/domain/chat/Line";
import assert from "assert";
import { Conversation } from "../../../_shared/domain/chat/Conversation";
import { CandidateScoreUpdatedEvent } from "./events/CandidateScoreUpdatedEvent";
import { MatchCreatedEvent } from "./events/MatchCreatedEvent";
import { SwipeCreatedEvent } from "./events/SwipeCreatedEvent";
import { Mail } from "../../../_core/domain/Mail";
import { CandidateMailUpdatedEvent } from "./events/CandidateMailUpdatedEvent";
import { AnyObject } from "../../../_core/domain/AnyObject";

type Params = {
  id: Uuid;
};
type Primitives = {
  id: Uuid;
  swipes: AnyObject[];
  isMatch: boolean;
  chat?: any;
  mail?: string;
};
export class Candidate extends AggregateRoot {
  private mail?: Mail;
  private isMatch: boolean;
  private _chat?: Chat;
  constructor(
    public readonly id: Uuid,
    private readonly swipes: Swipe[] = [],

  ) {
    super();
    this.isMatch = false;
  }
  static create({ id }: Params) {
    const candidate = new Candidate(id);
    candidate.record(new CandidateCreatedEvent(candidate.id));
    return candidate;
  }
  static fromPrimitives({ id, swipes, isMatch, chat, mail }: Primitives) {
    const candidate = new Candidate(id);
    candidate.swipes.push(...swipes.map(s => new Swipe(s.cardId, s.right, s.score)));
    candidate.isMatch = isMatch;
    candidate._chat = chat ? Chat.fromPrimitives(chat) : undefined;
    candidate.mail = mail ? new Mail(mail) : undefined;
    return candidate;
  }

  swipe(swipe: Swipe) {
    this.swipes.push(swipe);
    this.record(new SwipeCreatedEvent(this.id, swipe.cardId, swipe.right));
    this.record(new CandidateScoreUpdatedEvent(this.id));
  }

  match(matchEvaluator: MatchEvaluator) {
    if (matchEvaluator.isMatch(this.score)) {
      this.isMatch = true;
      this.record(new MatchCreatedEvent(this.id));
    }
  }

  getIsMatch() {
    return this.isMatch;
  }

  startChat(conversation: Conversation) {
    this._chat = new Chat(conversation);
    return this._chat.getChatItem();
  }

  talk(line?: Line) {
    if (line) {
      this.chat.talk(line);
    }
    return this.chat.getChatItem();
  }

  setMail(mail: Mail) {
    this.mail = mail;
    this.record(new CandidateMailUpdatedEvent(this.id, this.mail));
  }
  toPrimitives() {
    return {
      id: this.id.toString(),
      swipes: this.swipes.map(m => m.toPrimitives()),
      isMatch: this.isMatch,
      chat: this._chat?.toPrimitives(),
      mail: this.mail?.toString(),
    };
  }

  private get score() {
    return this.swipes.reduce((acc, swipe) => acc + swipe.score, 0);
  }

  private get chat() {
    assert(this._chat, "Missing chat");
    return this._chat;
  }
}
