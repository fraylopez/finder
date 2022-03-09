import { Swipe } from "./Swipe";

export interface SwipeService {
  swipe(swipe: Swipe): Promise<void>;
}
