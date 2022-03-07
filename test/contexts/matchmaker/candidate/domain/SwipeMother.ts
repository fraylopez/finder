import { Swipe } from "../../../../../src/contexts/matchmaker/candidate/domain/Swipe";
import { Uuid } from "../../../../../src/contexts/_shared/domain/value-object/Uuid";
import { MotherCreator } from "../../../_shared/domain/MotherCreator";


export class SwipeMother {
  static random(cardId?: Uuid) {
    return new Swipe(cardId || Uuid.random(), this.randomRight(), this.randomScore());
  }
  static withScore(score: number) {
    return new Swipe(Uuid.random(), this.randomRight(), score);
  }

  private static randomRight() {
    return MotherCreator.random().datatype.boolean();
  }
  private static randomScore() {
    return MotherCreator.random().datatype.number({ min: 0, max: 10 });
  }
}
