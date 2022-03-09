import { DomainEvent } from "../../../../_shared/domain/bus/DomainEvent";
import { PrimitiveDomainEvent } from "../../../../_shared/domain/bus/PrimitiveDomainEvent";
import { Mail } from "../../../../_shared/domain/Mail";
import { Uuid } from "../../../../_shared/domain/value-object/Uuid";

export class CandidateMailUpdatedEvent extends DomainEvent {
  static readonly NAME = "candidate.mail.updated";
  constructor(uid: Uuid, private readonly mail: Mail) {
    super(CandidateMailUpdatedEvent.NAME, uid.toString());
  }

  static fromPrimitives(primitives: PrimitiveDomainEvent) {
    return new CandidateMailUpdatedEvent(
      new Uuid(primitives.aggregateId),
      new Mail(primitives.payload!.mail),
    );
  }

  getPayloadPrimitives() {
    return {
      mail: this.mail.toString(),
    };
  }
}
