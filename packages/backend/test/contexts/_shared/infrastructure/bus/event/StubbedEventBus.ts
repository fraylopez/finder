import sinon from "sinon";
import { DomainEvent } from "../../../../../../src/contexts/_core/domain/bus/DomainEvent";
import { DomainEventClass } from "../../../../../../src/contexts/_core/domain/bus/DomainEventClass";
import { EventBus } from "../../../../../../src/contexts/_core/domain/bus/EventBus";
import { EventHandler } from "../../../../../../src/contexts/_core/domain/bus/EventHandler";
import { DomainEventMapping } from "../../../../../../src/contexts/_core/infrastructure/bus/event/DomainEventMapping";
import { Stub } from "../../../../../utils/Stub";
import { StubHelper } from "../../../../../utils/StubHelper";

export class StubbedEventBus implements EventBus {
  private bus: Stub<EventBus>;

  constructor() {
    this.bus = StubHelper.fromInterface<EventBus>();
  }
  setDomainEventMapping(_domainEventMapping: DomainEventMapping): void {
    throw new Error("Method not implemented.");
  }
  publish(events: DomainEvent[]): Promise<void> {
    return this.bus.publish(events);
  }
  addSubscribers(_subscribers: EventHandler<DomainEvent>[]): void {
    throw new Error("Method not implemented.");
  }
  start(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  assertPublished(eventKlass: DomainEventClass) {
    sinon.assert.calledWithMatch(
      this.bus.publish,
      sinon.match((evts: DomainEvent[]) =>
        evts.some(e => e.eventName === eventKlass.NAME)
      )
    );
  }

}