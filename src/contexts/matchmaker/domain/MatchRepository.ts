import { Match } from "./Match";

export interface MatchRepository {
  insert(course: Match): Promise<void>;
  searchAll(): Promise<Array<Match>>;
}
