import { injectable } from "inversify";

@injectable()
export class ScoreMatchEvaluator {
  static readonly MATCH_SCORE = 10;
  isMatch(score: number) {
    return score >= ScoreMatchEvaluator.MATCH_SCORE;
  }
}
