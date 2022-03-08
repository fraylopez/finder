export class Line {
  constructor(
    public readonly id: string,
    public readonly value: string
  ) { }

  toPrimitives() {
    return {
      id: this.id,
      value: this.value,
    };
  }
}
