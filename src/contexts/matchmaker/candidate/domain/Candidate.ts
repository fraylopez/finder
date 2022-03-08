import { AggregateRoot } from "../../../_shared/domain/AggregateRoot";
import { Uuid } from "../../../_shared/domain/value-object/Uuid";
import { MatchEvaluator } from "./MatchEvaluator";
import { CandidateCreatedEvent } from "./events/CandidateCreatedEvent";
import { Swipe } from "./Swipe";
import { Chat } from "./chatbot/Chat";
import { Line } from "./chatbot/Line";
import assert from "assert";
import { Conversation } from "./chatbot/Conversation";
import { CandidateScoreUpdatedEvent } from "./events/CandidateScoreUpdatedEvent";
import { MatchCreatedEvent } from "./events/MatchCreatedEvent";
import { SwipeCreatedEvent } from "./events/SwipeCreatedEvent";

type Params = {
  id: Uuid;
};
type Primitives = {
  id: Uuid;
  swipes: Record<string, any>[];
  isMatch: boolean;
  chat?: any;
};
export class Candidate extends AggregateRoot {

  private readonly swipes: Swipe[];
  private isMatch: boolean;
  private _chat?: Chat;
  constructor(
    public readonly id: Uuid,
  ) {
    super();
    this.swipes = [];
    this.isMatch = false;
  }
  static create({ id }: Params) {
    const candidate = new Candidate(id);
    candidate.record(new CandidateCreatedEvent(candidate.id));
    return candidate;
  }
  static fromPrimitives({ id, swipes, isMatch, chat }: Primitives) {
    const candidate = new Candidate(id);
    candidate.swipes.push(...swipes.map(s => new Swipe(s.cardId, s.right, s.score)));
    candidate.isMatch = isMatch;
    candidate._chat = chat ? Chat.fromPrimitives(chat) : undefined;
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

  startChat(conversation: Conversation) {
    this._chat = new Chat(conversation);
  }

  talk(line?: Line) {
    if (line) {
      this.chat.add(line);
    }
    return this.chat.getNext();
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      swipes: this.swipes.map(m => m.toPrimitives()),
      isMatch: this.isMatch,
      chat: this._chat?.toPrimitives()
    };
  }

  getIsMatch() {
    return this.isMatch;
  }

  private get score() {
    return this.swipes.reduce((acc, swipe) => acc + swipe.score, 0);
  }

  private get chat() {
    assert(this._chat);
    return this._chat!;
  }
}
