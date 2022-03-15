import { ChatService } from "../domain/ChatService";

export class ChatCreator {
  constructor(private readonly service: ChatService) { }

  add(uid: string, responseId: string) {
    return this.service.talk(uid, responseId);
  }
}
