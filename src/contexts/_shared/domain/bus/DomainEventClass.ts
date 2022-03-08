import { DomainEvent } from "./DomainEvent";

export type DomainEventClass = { NAME: string; fromPrimitives(...args: any[]): DomainEvent; };
