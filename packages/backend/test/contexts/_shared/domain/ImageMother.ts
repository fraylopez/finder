import { MotherCreator } from "./MotherCreator";
export class ImageMother {
  static random() {
    return MotherCreator.random().image.imageUrl(undefined, undefined, undefined, true);
  }
}
