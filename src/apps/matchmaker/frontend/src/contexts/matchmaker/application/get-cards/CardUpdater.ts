import { CardWebsocketClient } from "../../infrastructure/CardWebsocketClient";

export class CardUpdater {
  constructor(private readonly updateService: CardWebsocketClient) {/*  */ }
  register(callback: (message: any) => Promise<void> | void) {
    this.updateService.subscribe(callback);
  }
}