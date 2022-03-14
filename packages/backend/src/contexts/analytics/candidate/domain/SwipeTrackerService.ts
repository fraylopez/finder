import { AnaliticsSwipe } from "./AnalyticsSwipe";

export interface SwipeTrackerService {
  track(swipe: AnaliticsSwipe): Promise<void>;
}