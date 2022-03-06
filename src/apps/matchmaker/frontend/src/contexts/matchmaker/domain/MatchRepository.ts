import { Match } from "./Match";

export interface MatchRepository {
  searchAll(): Promise<Array<Match>>;
}
