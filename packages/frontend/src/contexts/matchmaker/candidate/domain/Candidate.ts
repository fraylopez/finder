import { Uuid } from "../../../_shared/domain/Uuid";

export class Candidate {

  constructor(public readonly id: string) {/*  */ }

  static create() {
    return new Candidate(Uuid.random().toString());
  }
}