import axios, { AxiosInstance } from "axios";
import { Card } from "../domain/Card";
import { CardRepository } from "../domain/CardRepository";

export class HttpCardRepository implements CardRepository {
  private fetcher: AxiosInstance;
  constructor(private readonly baseUrl: string) {
    this.fetcher = axios.create();
  }

  async searchAll(): Promise<Card[]> {
    const response = await this.fetcher(`${this.baseUrl}/card`);
    return response.data.map((d: { id: string; }) => new Card(d.id));
  }
};