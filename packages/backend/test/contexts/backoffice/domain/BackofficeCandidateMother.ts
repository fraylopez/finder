import { BackofficeCandidate } from "../../../../src/contexts/backoffice/candidate/domain/BackofficeCandidate";
import { Uuid } from "../../../../src/contexts/_core/domain/value-object/Uuid";

export class BackofficeCandidateMother {
  static random(id?: Uuid, score?: number) {
    return BackofficeCandidate.fromPrimitives({
      id: id?.toString() || Uuid.random().toString(),
      score: score || 0
    });
  }
}
