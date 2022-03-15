import { DomainEvent } from "../../../_core/domain/DomainEvent";

export class CandidateCreatedEvent extends DomainEvent {
  static NAME = "candidate.created";
  constructor(uid: string) {
    super(CandidateCreatedEvent.NAME, uid.toString());
  }
}
