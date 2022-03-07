import axios, { AxiosInstance } from "axios";
import { Swipe } from "../domain/Swipe";
import { SwipeService } from "../domain/SwipeService";

export class HttpSwipeService implements SwipeService {
  private fetcher: AxiosInstance;
  constructor(private readonly baseUrl: string) {
    this.fetcher = axios.create();
  }
  async swipe(swipe: Swipe): Promise<void> {
    await this.fetcher(
      `${this.baseUrl}/candidate/${swipe.uid}/swipe/${swipe.cardId}`,
      {
        method: "put",
        data: {
          right: swipe.right
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      });
  }
}
