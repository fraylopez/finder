import { WordMother } from "../../_shared/domain/WordMother";

export class MatchTitleMother {
  static random() {
    return WordMother.random(4);
  }
}