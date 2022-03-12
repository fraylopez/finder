export interface UpdateService {
  connect(uid: string): void;
  subscribe(topic: string, handler: (message: any) => void | Promise<void>): void;
}