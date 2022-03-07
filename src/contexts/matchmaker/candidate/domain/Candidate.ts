import { AggregateRoot } from "../../../_shared/domain/AggregateRoot";
import { Uuid } from "../../../_shared/domain/value-object/Uuid";
import { MatchEvaluator } from "./MatchEvaluator";
import { CandidateCreatedEvent } from "./CandidateCreatedEvent";
import { CandidateMatchCreatedEvent } from "./CandidateMatchCreatedEvent";
import { CandidateScoreUpdatedEvent } from "./CandidateScoreUpdatedEvent";
import { Swipe } from "./Swipe";
import { SwipeCreatedEvent } from "./SwipeCreatedEvent";

type Params = {
  id: Uuid;
};
type Primitives = {
  id: Uuid;
  swipes: Record<string, any>[];
  isMatch: boolean;
};
export class Candidate extends AggregateRoot {

  private readonly swipes: Swipe[];
  private isMatch: boolean;
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
  static fromPrimitives({ id, swipes, isMatch }: Primitives) {
    const candidate = new Candidate(id);
    candidate.swipes.push(...swipes.map(s => new Swipe(s.cardId, s.right, s.score)));
    candidate.isMatch = isMatch;
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
      this.record(new CandidateMatchCreatedEvent(this.id));
    }
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      swipes: this.swipes.map(m => m.toPrimitives()),
      isMatch: this.isMatch,
    };
  }

  private get score() {
    return this.swipes.reduce((acc, swipe) => acc + swipe.score, 0);
  }

}

;
