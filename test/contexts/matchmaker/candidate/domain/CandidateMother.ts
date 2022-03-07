import { Candidate } from "../../../../../src/contexts/matchmaker/candidate/domain/Candidate";
import { Uuid } from "../../../../../src/contexts/_shared/domain/value-object/Uuid";
import { MotherCreator } from "../../../_shared/domain/MotherCreator";
import { SwipeMother } from "./SwipeMother";

export class CandidateMother {
  static random() {
    return Candidate.fromPrimitives({
      id: Uuid.random(),
      swipes: [],
      isMatch: this.randomMatch(),
    });
  }
  static randomWithSwipes() {
    return Candidate.fromPrimitives({
      id: Uuid.random(),
      swipes: [SwipeMother.random()],
      isMatch: this.randomMatch(),
    });
  }

  static withScore(score: number) {
    return Candidate.fromPrimitives({
      id: Uuid.random(),
      swipes: [SwipeMother.withScore(score)],
      isMatch: false,
    });
  }

  private static randomMatch() {
    return MotherCreator.random().datatype.boolean();
  }
}
