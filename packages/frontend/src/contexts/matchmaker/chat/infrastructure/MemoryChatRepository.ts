import { ChatMessage } from "../domain/ChatMessage";
import { ChatRepository } from "../domain/ChatRepository";

export class MemoryChatRepository implements ChatRepository {
  private chat: ChatMessage[];
  constructor() {
    this.chat = [];
  }
  add(message: ChatMessage): Promise<void> {
    this.chat.push(message);
    return Promise.resolve();
  }

  get(): Promise<ChatMessage[]> {
    return Promise.resolve(this.chat);
  }

}