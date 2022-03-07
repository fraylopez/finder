import { MatchWebSocketClient } from "../../infrastructure/MatchWebSocketClient";

export class MatchUpdater {
  constructor(private readonly updateService: MatchWebSocketClient) {/*  */ }
  register(callback: (message: any) => Promise<void> | void) {
    this.updateService.subscribe(callback);
  }
}