
export class DomainError extends Error {
  constructor(private readonly aggregateId?: string, message?: string,) {
    super();
    this.message = message || this.getFallbackErrorMessage();
  }

  private getFallbackErrorMessage() {
    const errorId = this.constructor.name;
    return `${errorId} ${this.aggregateId ? "at aggregate: " + this.aggregateId : ""}`;
  }
}
