import { DomainEvent } from "../../_core/domain/bus/DomainEvent";

export interface EventExposer {
  expose(event: DomainEvent): void;
}
