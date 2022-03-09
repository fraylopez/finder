import axios, { AxiosInstance } from "axios";
import { Card } from "../card/domain/Card";
import { CardRepository } from "../card/domain/CardRepository";

export class HttpCardRepository implements CardRepository {
  private fetcher: AxiosInstance;
  constructor(private readonly baseUrl: string) {
    this.fetcher = axios.create();
  }

  async searchAll(): Promise<Card[]> {
    const response = await this.fetcher(`${this.baseUrl}/card`);
    return response.data.map((d: any) => new Card(d.id, d.title, d.imageUrl));
  }
};