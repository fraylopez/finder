/* eslint-disable @typescript-eslint/no-misused-promises */
import { WebSocketServer } from "../../../contexts/_core/infrastructure/WebSocketServer";
import { IncomingUserChatMessageController } from "../controllers/ws/IncomingUserChatMessageController";
import { container } from "../ioc/installer";

export const register = (server: WebSocketServer) => {
  const cardsGetController = container.get(IncomingUserChatMessageController);
  // server.
  // cardsGetController.
  // app.get('/card', cardsGetController.request.bind(cardsGetController));

};
