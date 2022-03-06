import { inject, injectable } from "inversify";
import { Logger } from "mongodb";
import { types } from "../../../apps/matchmaker/backend/ioc/types";
import { DomainEvent } from "../domain/DomainEvent";

@injectable()
export class EventLogger {
  constructor(@inject(types.Logger) private readonly logger: Logger) { }

  log(event: DomainEvent) {
    this.logger.info(`${event.eventName} received`);
  }
}