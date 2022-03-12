import { UpdateService } from "../domain/UpdateService";

export class MatchUpdater {
  private callback!: (message: any) => Promise<void> | void;

  constructor(private readonly updateService: UpdateService) {/*  */ }
  addCallback(callback: (message: any) => Promise<void> | void) {
    this.callback = callback;
  }

  register(uid: string) {
    this.updateService.connect(uid);
    this.updateService.subscribe("match.created", this.callback);
    this.updateService.subscribe("swipe.created", this.callback); // TODO: remove this is for dev purposes
  }
}