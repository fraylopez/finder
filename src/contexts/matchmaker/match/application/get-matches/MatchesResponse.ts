import { Match } from "../../domain/Match";

export class MatchesResponse {
  readonly matches: Array<Match>;

  constructor(courses: Array<Match>) {
    this.matches = courses;
  }
}
