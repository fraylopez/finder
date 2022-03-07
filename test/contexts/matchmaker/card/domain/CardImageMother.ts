import { MotherCreator } from "../../../_shared/domain/MotherCreator";


export class CardImageMother {
  static random() {
    return MotherCreator.random().image.imageUrl(undefined, undefined, undefined, true);
  }
}
