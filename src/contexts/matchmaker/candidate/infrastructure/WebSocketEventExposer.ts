import { Server } from "../../../../apps/matchmaker/backend/server";
import { DomainEvent } from "../../../_shared/domain/DomainEvent";
import { EventExposer } from "../domain/EventExposer";
import * as WebSocket from 'ws';
import { injectable } from "inversify";

@injectable()
export class WebSocketEventExposer implements EventExposer {
  private wss!: WebSocket.Server;
  constructor() { };

  init(server: Server) {
    this.wss = new WebSocket.Server({ server: server.httpServer });
  }

  expose(event: DomainEvent): void {
    this.wss.emit(event.eventName, event.toPrimitives());
  }

}