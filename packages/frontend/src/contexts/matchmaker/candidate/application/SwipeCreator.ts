import { Swipe } from "../domain/Swipe";
import { SwipeService } from "../domain/SwipeService";

export class SwipeCreator {

  constructor(private readonly service: SwipeService) {/*  */ }

  swipe(uid: string, cardId: string, right: boolean) {
    const swipe = new Swipe(uid, cardId, right);
    this.service.swipe(swipe);
  }
}

