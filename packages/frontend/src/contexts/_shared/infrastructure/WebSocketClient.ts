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

  constructor(private readonly baseUrl: string) {
    this.subscriptions = new Map();
  }

  connect(uid: string) {
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
  }

  private onConnection() {
    this.wss.on("*", this.onMessage.bind(this));
  }

  private onMessage(message: Message) {
    this.subscriptions.get(message.messageName)?.map(s => s(message));
  }
};