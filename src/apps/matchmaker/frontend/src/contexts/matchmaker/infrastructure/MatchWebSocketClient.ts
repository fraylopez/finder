import io from "socket.io-client";

export class MatchWebSocketClient {
  private subscriptions: Array<(message: any) => Promise<void> | void>;

  constructor(baseUrl: string) {
    this.subscriptions = [];
    const wss = io(baseUrl);
    wss.on("swipe.created", this.onMessage.bind(this));
  }

  subscribe(callback: (message: any) => Promise<void> | void) {
    this.subscriptions.push(callback);
  }

  private onMessage(message: any) {
    this.subscriptions.map(s => s(message));
  }
};