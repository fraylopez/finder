import { DomainEvent } from "../../../_shared/domain/bus/DomainEvent";
import { EventExposer } from "../domain/EventExposer";
import { inject, injectable } from "inversify";
import { types } from "../../../../apps/backend/ioc/types";
import { WebSocketServer } from "../../../_shared/infrastructure/WebSocketServer";

@injectable()
export class WebSocketEventExposer implements EventExposer {
  constructor(@inject(types.WebSocketServer) private readonly websocketServer: WebSocketServer) { };

  expose(event: DomainEvent): void {
    this.websocketServer.emit(event.eventName, event.toPrimitives());
  }
}
