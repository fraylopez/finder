import io, { Manager, Socket } from "socket.io-client";
import wilcard from 'socketio-wildcard';
import { UpdateService } from "../../matchmaker/candidate/domain/UpdateService";

type Handler = (message: any) => Promise<void> | void;
interface Message {
  messageName: string,
  payload: object;
}
export class WebSocketClient implements UpdateService {
  private wss!: typeof Socket;
  private subscriptions: Map<string, Array<Handler>>;
  private connected: boolean;

  constructor(private readonly baseUrl: string) {
    this.subscriptions = new Map();
    this.connected = false;
  }

  connect(uid: string) {
    if (this.connected) {
      return;
    }
    this.connected = true;
    this.wss = io(this.baseUrl, { autoConnect: false, query: { uid } });
    const wildcardPatch = wilcard(Manager);
    wildcardPatch(this.wss);
    this.wss.on("connect", this.onConnection.bind(this));
    this.wss.connect();
  }

  subscribe(topic: string, callback: (message: any) => Promise<void> | void) {
    const current = this.subscriptions.get(topic) || [];
    current.push(callback);
    this.subscriptions.set(topic, current);
  }
  unsubscribe(topic: string, callback: (message: any) => Promise<void> | void) {
    const current = this.subscriptions.get(topic) || [];
    current.splice(current.indexOf(callback), 1);
    this.subscriptions.set(topic, current);
    this.wss.disconnect();
    this.wss.off("*");
    this.connected = false;
  }

  private onConnection() {
    this.wss.on("*", (data: { data: [messageName: string, message: Message]; }) => this.onMessage(data.data[0], data.data[1]));
  }

  private onMessage(messageName: string, message: Message) {
    const handlers = this.subscriptions.get(messageName) || [];
    handlers.forEach(s => s(message));
  }
};