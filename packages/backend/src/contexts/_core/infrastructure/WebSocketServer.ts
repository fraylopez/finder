import * as socketIO from "socket.io";
import { injectable } from "inversify";
import { Server } from "http";

@injectable()
export class WebSocketServer {
  private connectedClients: Map<string, string>;
  private wss!: socketIO.Server;

  constructor(httpServer: Server) {
    this.connectedClients = new Map();
    httpServer?.on("connect", () => {
      this.wss = new socketIO.Server(httpServer);
      this.wss.on("connection", this.onClientConnect.bind(this));
    });
  }

  emit(uid: string, eventName: string, data: object) {
    const socket = this.connectedClients.get(uid);
    if (socket) {
      this.wss.to(socket).emit(eventName, data);
    }
  }

  private onClientConnect(socket: socketIO.Socket) {
    socket.on(
      "disconnect",
      (reason: string) => this.onClientDisconnect(socket.id, reason));

    const uid = socket.handshake.query.uid;
    if (uid) {
      this.connectedClients.set(uid as string, socket.id);
    }
  }
  private onClientDisconnect(socketId: string, _reason: string) {
    const uid = this.getUidFromSocketId(socketId);
    if (uid) {
      this.connectedClients.delete(uid);
    }
  }
  private getUidFromSocketId(id: string) {
    return Array.from(this.connectedClients).find(c => c[1] === id)?.[0];
  }

}
