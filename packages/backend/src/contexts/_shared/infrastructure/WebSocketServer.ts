import { Server } from "../../../apps/backend/server";
import * as socketIO from "socket.io";
import { injectable } from "inversify";
import assert from "assert";

@injectable()
export class WebSocketServer {
  private connectedClients: Map<string, string>;
  private wss!: socketIO.Server;

  constructor() {
    this.connectedClients = new Map();
  }

  init(server: Server) {
    this.wss = new socketIO.Server(server.httpServer);
    this.wss.on("connection", this.onClientConnect.bind(this));
  }

  emit(uid: string, eventName: string, data: object) {
    const socket = this.connectedClients.get(uid);
    assert(socket, "user without socket");
    this.wss.to(socket).emit(eventName, data);
  }

  private onClientConnect(data: socketIO.Socket) {
    const uid = data.handshake.query.uid;
    if (uid) {
      this.connectedClients.set(uid as string, data.id);
    }
  }
  private onClientDisconnect(data: socketIO.Socket) {
    const uid = data.handshake.query.uid;
    if (uid) {
    }
  }

}
