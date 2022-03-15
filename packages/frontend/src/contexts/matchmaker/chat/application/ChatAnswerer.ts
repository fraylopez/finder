import { ChatService } from "../domain/ChatService";

export class ChatAnswerer {
  constructor(private readonly chatService: ChatService) { }

  async answer(uid: string, responseId: string) {
    await this.chatService.talk(uid, responseId);
  }
}