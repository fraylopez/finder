import { WebSocketService } from "../domain/WebSocketService";

export class MatchUpdater {
  constructor(private readonly updateService: WebSocketService) {/*  */ }
  addCallback(callback: (message: any) => Promise<void> | void) {
    this.updateService.subscribe("match.created", callback);
  }
}