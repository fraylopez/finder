import { Server } from "../../../../apps/matchmaker/backend/server";
import { DomainEvent } from "../../../_shared/domain/DomainEvent";
import { EventExposer } from "../domain/EventExposer";
import * as socketIO from "socket.io";
import { injectable } from "inversify";

@injectable()
export class WebSocketEventExposer implements EventExposer {
  private wss!: socketIO.Server;
  constructor() { };

  init(server: Server) {
    this.wss = new socketIO.Server(server.httpServer);
  }

  expose(event: DomainEvent): void {
    this.wss.emit(event.eventName, event.toPrimitives());
  }

}