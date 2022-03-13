import { DomainEvent } from "../../../../_core/domain/bus/DomainEvent";
import { PrimitiveDomainEvent } from "../../../../_core/domain/bus/PrimitiveDomainEvent";
import { Mail } from "../../../../_core/domain/Mail";
import { Uuid } from "../../../../_core/domain/value-object/Uuid";

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
