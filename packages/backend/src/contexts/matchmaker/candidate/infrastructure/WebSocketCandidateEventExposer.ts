import { DomainEvent } from "../../../_core/domain/bus/DomainEvent";
import { EventExposer } from "../domain/EventExposer";
import { inject, injectable } from "inversify";
import { types } from "../../../../apps/matchmaker/ioc/types";
import { WebSocketServer } from "../../../_core/infrastructure/WebSocketServer";

@injectable()
export class WebSocketCandidateEventExposer implements EventExposer {
  constructor(@inject(types.WebSocketServer) private readonly websocketServer: WebSocketServer) { }

  expose(event: DomainEvent): void {
    this.websocketServer.emit(event.aggregateId, event.eventName, event.toPrimitives());
  }
}
