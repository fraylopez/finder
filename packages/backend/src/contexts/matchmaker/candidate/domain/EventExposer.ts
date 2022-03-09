import { DomainEvent } from "../../../_shared/domain/bus/DomainEvent";

export interface EventExposer {
  expose(event: DomainEvent): void;
}
