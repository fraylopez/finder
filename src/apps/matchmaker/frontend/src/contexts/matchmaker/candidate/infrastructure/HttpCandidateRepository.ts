import axios, { AxiosInstance } from "axios";
import { Candidate } from "../domain/Candidate";
import { CandidateRepository } from "../domain/CandidateRepository";

export class HttpCandidateRepository implements CandidateRepository {
  private fetcher: AxiosInstance;
  constructor(private readonly baseUrl: string) {
    this.fetcher = axios.create();
  }

  async add(candidate: Candidate): Promise<void> {
    await this.fetcher(
      `${this.baseUrl}/candidate/${candidate.id}`,
      {
        method: "put",
        data: {},
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      });
  }

  get(): Promise<Candidate | null> {
    throw new Error("Not implemeted");
  }

}