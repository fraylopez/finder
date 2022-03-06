import { MatchWebsocketClient } from "../../infrastructure/MatchWebsocketClient";

export class MatchUpdater {
  constructor(private readonly updateService: MatchWebsocketClient) {/*  */ }
  register(callback: (message: any) => Promise<void> | void) {
    this.updateService.subscribe(callback);
  }
}