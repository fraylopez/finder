import { Match } from "../../../../src/contexts/matchmaker/domain/Match";
import { Uuid } from "../../../../src/contexts/_shared/domain/value-object/Uuid";
import { MotherCreator } from "../../_shared/domain/MotherCreator";
import { MatchTitleMother } from "./MatchTitleMother";

export class MatchMother {
  static random() {
    return Match.create({
      id: Uuid.random(),
      title: MatchTitleMother.random(),
      imageUrl: MotherCreator.random().image.imageUrl(),
    });
  }
}