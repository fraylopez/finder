import axios, { AxiosInstance } from "axios";
import { WebSocketService } from "../../candidate/domain/WebSocketService";
import { Chat } from "../domain/Chat";
import { ChatMessage } from "../domain/ChatMessage";
import { ChatService } from "../domain/ChatService";

export class WebSocketChatService implements ChatService {
  private fetcher: AxiosInstance;
  constructor(
    private readonly baseUrl: string,
    private readonly websocketService: WebSocketService
  ) {
    this.fetcher = axios.create();
  }

  async talk(uid: string, responseId: string): Promise<void> {
    this.websocketService.send("chat.message", { uid, responseId });
  }

  async get(uid: string): Promise<any> {
    const chatDTO = await this.fetcher(`${this.baseUrl}/candidate/${uid}/chat`);
    const chat: Chat = {
      lines: chatDTO.data.path as ChatMessage[],
      next: chatDTO.data.next as ChatMessage[]
    };
    return chat;
  }
}
