export class CardWebsocketClient {
  private subscriptions: Array<(message: any) => Promise<void> | void>;

  constructor(private readonly baseUrl: string) {
    this.subscriptions = [];

  }

  subscribe(callback: (message: any) => Promise<void> | void) {
    const ws = new WebSocket('ws://localhost:8999');
    ws.onopen = w => {
      this.subscriptions.push(callback);
      ws.onmessage = this.onMessage.bind(this);
    };
  }

  private onMessage(message: any) {
    this.subscriptions.map(s => s(message));
  }
};