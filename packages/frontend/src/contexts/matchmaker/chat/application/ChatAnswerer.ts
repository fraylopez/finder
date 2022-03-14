import { ChatService } from "../domain/ChatService";

export class ChatAnswerer {
  constructor(private readonly chatService: ChatService) { }

  async answer(responseId: string) {
    await this.chatService.answer(responseId);
  }
}