import { Card } from "../../../../../src/contexts/matchmaker/card/domain/Card";
import { Uuid } from "../../../../../src/contexts/_shared/domain/value-object/Uuid";
import { MotherCreator } from "../../../_shared/domain/MotherCreator";
import { CardTitleMother } from "./CardTitleMother";

export class CardMother {
  static random() {
    return Card.create({
      id: Uuid.random(),
      title: CardTitleMother.random(),
      score: MotherCreator.random().datatype.number({ min: 0, max: 10 }),
      imageUrl: MotherCreator.random().image.imageUrl(),
    });
  }
}