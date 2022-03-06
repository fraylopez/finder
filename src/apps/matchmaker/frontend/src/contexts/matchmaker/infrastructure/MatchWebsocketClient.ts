export class MatchWebsocketClient {
  private subscriptions: Array<(message: any) => Promise<void> | void>;

  constructor(private readonly baseUrl: string) {
    this.subscriptions = [];
    // const ws = new WebSocket('ws://localhost:8999');
    // hook to this.onMessage
  }

  subscribe(callback: (message: any) => Promise<void> | void) {
    this.subscriptions.push(callback);
  }

  private onMessage(message: any) {
    this.subscriptions.map(s => s(message));
  }
};