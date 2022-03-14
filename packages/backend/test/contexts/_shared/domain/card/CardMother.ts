import { Card } from "../../../../../src/contexts/_shared/domain/card/Card";
import { Uuid } from "../../../../../src/contexts/_core/domain/value-object/Uuid";
import { MotherCreator } from "../../../_shared/domain/MotherCreator";
import { ImageMother } from "../../../_shared/domain/ImageMother";
import { CardTitleMother } from "./CardTitleMother";

export class CardMother {
  static random(id?: Uuid) {
    return Card.create({
      id: id || Uuid.random(),
      title: CardTitleMother.random(),
      score: {
        right: MotherCreator.random().datatype.number({ min: 0, max: 10 }),
        left: MotherCreator.random().datatype.number({ min: 0, max: 10 }),
      },
      imageUrl: ImageMother.random(),
    });
  }
}