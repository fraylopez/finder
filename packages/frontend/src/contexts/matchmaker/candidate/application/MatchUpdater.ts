import { UpdateService } from "../domain/UpdateService";

export class MatchUpdater {
  constructor(private readonly updateService: UpdateService) {/*  */ }
  addCallback(callback: (message: any) => Promise<void> | void) {
    this.updateService.subscribe("match.created", callback);
  }
}