import { Server } from "../../../apps/matchmaker/backend/server";
import * as socketIO from "socket.io";
import { injectable } from "inversify";

@injectable()
export class WebSocketServer {
  private wss!: socketIO.Server;

  init(server: Server) {
    this.wss = new socketIO.Server(server.httpServer);
  }

  emit(eventName: string, data: object) {
    this.wss.emit(eventName, data);
  }
}
