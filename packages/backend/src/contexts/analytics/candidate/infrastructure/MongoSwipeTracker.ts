import { inject, injectable } from "inversify";
import { MongoClientFactory } from "../../../_core/infrastructure/persistence/mongo/MongoClientFactory";
import { SwipeTrackerService } from "../domain/SwipeTrackerService";
import { AnaliticsSwipe } from "../domain/AnalyticsSwipe";
import { globalConfig } from "../../../_core/infrastructure/globalConfig";

@injectable()
export class MongoSwipeTrackerService implements SwipeTrackerService {
  constructor(
    @inject(MongoClientFactory) private clientFactory: MongoClientFactory,
  ) { }

  async track(swipe: AnaliticsSwipe) {
    const client = await this.clientFactory.getClient("analytics", globalConfig.mongo);
    await client.db().collection("analytics").insertOne(swipe);
  }


}

