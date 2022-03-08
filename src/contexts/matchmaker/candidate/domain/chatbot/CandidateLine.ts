import { Line } from "./Line";

export class CandidateLine extends Line {
  constructor(id: string, value?: string) {
    super(id, value || "-");
  }

  toPrimitives() {
    return {
      id: this.id,
      value: this.value,
    };
  }
}
