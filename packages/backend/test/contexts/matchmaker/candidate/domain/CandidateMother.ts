import { Candidate } from "../../../../../src/contexts/matchmaker/candidate/domain/Candidate";
import { ScoreMatchEvaluator } from "../../../../../src/contexts/matchmaker/candidate/domain/ScoreMatchEvaluator";
import { Uuid } from "../../../../../src/contexts/_core/domain/value-object/Uuid";
import { MotherCreator } from "../../../_shared/domain/MotherCreator";
import { SwipeMother } from "./SwipeMother";

export class CandidateMother {
  static random(id?: Uuid) {
    return Candidate.fromPrimitives({
      id: id || Uuid.random(),
      swipes: [],
      isMatch: false
    });
  }
  static randomWithSwipes() {
    return Candidate.fromPrimitives({
      id: Uuid.random(),
      swipes: [SwipeMother.random()],
      isMatch: false
    });
  }

  static withScore(score: number) {
    return Candidate.fromPrimitives({
      id: Uuid.random(),
      swipes: [SwipeMother.withScore(score)],
      isMatch: false,
    });
  }
  static match() {
    return Candidate.fromPrimitives({
      id: Uuid.random(),
      swipes: [SwipeMother.withScore(ScoreMatchEvaluator.MATCH_SCORE)],
      isMatch: true,
    });
  }

  private static randomMatch() {
    return MotherCreator.random().datatype.boolean();
  }
}
