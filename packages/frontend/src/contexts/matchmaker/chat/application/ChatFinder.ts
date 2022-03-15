import { Chat } from "../domain/Chat";
import { ChatService } from "../domain/ChatService";

export class ChatFinder {
  constructor(private readonly service: ChatService) { }

  async get(uid: string) {
    const chat = await this.service.get(uid);
    return chat;
  }
}
