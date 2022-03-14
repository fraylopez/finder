import { SwipeCreatedEvent } from "../../../matchmaker/candidate/domain/events/SwipeCreatedEvent";
import { DomainEventClass } from "../../../_core/domain/bus/DomainEventClass";
import { EventHandler } from "../../../_core/domain/bus/EventHandler";
import { inject, injectable } from "inversify";
import { SwipeTracker } from "./SwipeTracker";

@injectable()
export class TrackSwipeOnSwipeCreatedEvent implements EventHandler {

  constructor(
    @inject(SwipeTracker) private readonly tracker: SwipeTracker
  ) { }

  subscribedTo(): DomainEventClass[] {
    return [SwipeCreatedEvent];
  }

  async handle(event: SwipeCreatedEvent) {
    await this.tracker.track({
      cardId: event.cardId.toString(),
      timestamp: event.timestamp
    });
  }

}