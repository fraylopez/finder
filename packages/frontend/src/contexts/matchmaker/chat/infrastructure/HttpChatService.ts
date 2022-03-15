import axios, { AxiosInstance } from "axios";
import { Chat } from "../domain/Chat";
import { ChatMessage } from "../domain/ChatMessage";
import { ChatService } from "../domain/ChatService";

export class HttpChatService implements ChatService {
  private fetcher: AxiosInstance;
  constructor(private readonly baseUrl: string) {
    this.fetcher = axios.create();
  }


  async talk(uid: string, responseId: string): Promise<void> {
    await this.fetcher(`${this.baseUrl}/candidate/${uid}/chat`, {
      method: "put",
      data: {
        responseId,
      }
    });
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