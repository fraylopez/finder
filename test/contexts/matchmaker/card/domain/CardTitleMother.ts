import { WordMother } from "../../../_shared/domain/WordMother";

export class CardTitleMother {
  static random() {
    return WordMother.random(4);
  }
}