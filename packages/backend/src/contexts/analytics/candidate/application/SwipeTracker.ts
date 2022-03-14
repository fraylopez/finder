import { inject, injectable } from "inversify";
import { types } from "../../../../apps/analytics/ioc/types";
import { AnaliticsSwipe } from "../domain/AnalyticsSwipe";
import { SwipeTrackerService } from "../domain/SwipeTrackerService";

interface Params {
  cardId: string;
  timestamp: number;
}

@injectable()
export class SwipeTracker {
  constructor(
    @inject(types.SwipeTrackerService) private service: SwipeTrackerService
  ) { }

  async track({ cardId, timestamp }: Params) {
    const swipe: AnaliticsSwipe = {
      cardId,
      timestamp: new Date(timestamp)

    };
    await this.service.track(swipe);
  }
}
