import { DomainEvent } from "../../../../_core/domain/bus/DomainEvent";
import { Uuid } from "../../../../_core/domain/value-object/Uuid";

export class CandidateCreatedEvent extends DomainEvent {
  static readonly NAME = "candidate.created";
  constructor(uid: Uuid) {
    super(CandidateCreatedEvent.NAME, uid.toString());
  }
}
