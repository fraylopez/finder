import { DomainEvent } from "./DomainEvent";

export class WildcardEvent extends DomainEvent {
  static readonly NAME = "#";
}