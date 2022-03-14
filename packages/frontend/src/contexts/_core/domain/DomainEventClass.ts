import { DomainEvent } from "./DomainEvent";

type Newable<T> = new (...args: any[]) => T;

export type DomainEventClass<T extends DomainEvent = DomainEvent> = { NAME: string; fromPrimitives(...args: any[]): DomainEvent; } & Newable<T>;
