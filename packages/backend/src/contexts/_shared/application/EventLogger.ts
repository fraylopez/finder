import { inject, injectable } from "inversify";
import { Logger } from "mongodb";
import { coreTypes } from "../../../apps/_core/ioc/coreTypes";
import { DomainEvent } from "../../_core/domain/bus/DomainEvent";

@injectable()
export class EventLogger {
  constructor(@inject(coreTypes.Logger) private readonly logger: Logger) { }

  log(event: DomainEvent) {
    this.logger.info(`${event.eventName} received`);
  }
}