import { UpdateService } from "../../candidate/domain/UpdateService";

export class ChatUpdater {
  private callback!: (message: any) => Promise<void> | void;

  constructor(private readonly updateService: UpdateService) {/*  */ }
  addCallback(callback: (message: any) => Promise<void> | void) {
    this.callback = callback;
  }

  register(uid: string) {
    this.updateService.connect(uid);
    this.updateService.subscribe("chat.message", this.callback);
  }
}