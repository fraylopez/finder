import * as socketIO from "socket.io";
import wilcardMessagesMiddleware from "socketio-wildcard";
import { Server } from "http";
import { SocketIOController } from "../../../apps/_core/controllers/SocketIOController";
import { injectable } from "inversify";

@injectable()
export class WebSocketServer {
  private connectedClients: Map<string, string>;
  private wss!: socketIO.Server;
  private readonly handlers: Map<string, SocketIOController[]>;
  constructor() {
    this.connectedClients = new Map();
    this.handlers = new Map();
  }

  init(httpServer: Server) {
    return new Promise<void>(resolve => {
      this.wss = new socketIO.Server(httpServer);
      this.wss.use(wilcardMessagesMiddleware());
      this.wss.on("connection", this.onClientConnect.bind(this));
      resolve();
    });
  }

  emit(uid: string, eventName: string, data: object) {
    const socket = this.connectedClients.get(uid);
    if (socket) {
      this.wss.to(socket).emit(eventName, data);
    }
  }
  register(eventName: string, handler: SocketIOController) {
    const current = this.handlers.get(eventName) || [];
    current.push(handler);
    this.handlers.set(eventName, current);
  }

  async onClientMessage(eventName: string, message: any) {
    const handlers = this.handlers.get(eventName) || [];
    await Promise.all(
      handlers.map(h =>
        h.handle(message)
      )
    );
  }

  private onClientConnect(socket: socketIO.Socket) {
    socket.on(
      "disconnect",
      (reason: string) => this.onClientDisconnect(socket.id, reason));
    socket.on(
      "*",
      (message: { data: [messageName: string, message: any]; }) =>
        this.onClientMessage(message.data[0], message.data[1])
    );

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
