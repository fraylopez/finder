import { ChatRepository } from "../domain/ChatRepository";

export class ChatFinder {
  constructor(private readonly repository: ChatRepository) { }

  get() {
    return this.repository.get();
  }
}
