export interface WebSocketService {
  connect(uid: string): void;
  subscribe(topic: string, handler: (message: any) => void | Promise<void>): void;
  send(topic: string, message: object): void;
}