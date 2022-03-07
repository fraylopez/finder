import { v4 } from 'uuid';

export class Uuid {
  readonly value: string;

  constructor(value: string) {
    this.ensureIsValidUuid(value);

    this.value = value;
  }

  static random(): Uuid {
    return new Uuid(v4());
  }

  toString(): string {
    return this.value;
  }

  equals(uuid: Uuid | string) {
    return uuid.toString() === this.value;
  }

  private ensureIsValidUuid(id: string): void {
    if (!this.validate(id)) {
      throw new Error(`<${this.constructor.name}> does not allow the value <${id}>`);
    }
  }
  private validate(id: string) {
    //TODO: fix this
    return id.length === 36;
  }
}
