import { DomainEvent } from "../../../_shared/domain/DomainEvent";

export class CandidateCreatedEvent extends DomainEvent {
  static NAME = "candidate.created";
  constructor(uid: string) {
    super(CandidateCreatedEvent.NAME, uid.toString());
  }
}
