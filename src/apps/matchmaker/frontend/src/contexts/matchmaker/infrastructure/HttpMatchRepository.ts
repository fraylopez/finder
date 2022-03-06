import axios, { AxiosInstance } from "axios";
import { Match } from "../domain/Match";
import { MatchRepository } from "../domain/MatchRepository";

export class HttpMatchRepository implements MatchRepository {
  private fetcher: AxiosInstance;
  constructor(private readonly baseUrl: string) {
    this.fetcher = axios.create();
  }

  async searchAll(): Promise<Match[]> {
    const response = await this.fetcher(`${this.baseUrl}/matchmaker`);
    return response.data.map((d: { id: string; }) => new Match(d.id));
  }
};