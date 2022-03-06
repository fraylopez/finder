import { DomainEvent } from "../../../_shared/domain/DomainEvent";
import { Uuid } from "../../../_shared/domain/value-object/Uuid";

export class CandidateCreatedEvent extends DomainEvent {
  static readonly NAME = "candidate.created";
  constructor(uid: Uuid) {
    super(CandidateCreatedEvent.NAME, uid.toString());
  }
}
