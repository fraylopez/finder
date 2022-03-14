import { ChatMessage } from "../domain/ChatMessage";
import { ChatRepository } from "../domain/ChatRepository";

export class ChatCreator {
  constructor(private readonly repository: ChatRepository) { }

  add(message: ChatMessage) {
    return this.repository.add(message);
  }
}
