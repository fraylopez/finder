import { UpdateService } from "../../candidate/domain/UpdateService";
import { ChatMessage } from "../domain/ChatMessage";

export interface ReceivedMessage {
  current: ChatMessage;
  next: ChatMessage[];
}

export class ChatUpdater {
  constructor(private readonly updateService: UpdateService) {/*  */ }
  addCallback(callback: (message: ReceivedMessage) => Promise<void> | void) {
    this.updateService.subscribe("chat.message", callback);
  }
}