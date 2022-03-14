import axios, { AxiosInstance } from "axios";
import { ChatService } from "../chat/domain/ChatService";

export class HttpChatService implements ChatService {
  private fetcher: AxiosInstance;
  constructor(private readonly baseUrl: string) {
    this.fetcher = axios.create();
  }

  async answer(responseId: string): Promise<void> {
    await this.fetcher(`${this.baseUrl}/chat`, {
      method: "put",
      data: {
        responseId,
      }
    });
  }
}