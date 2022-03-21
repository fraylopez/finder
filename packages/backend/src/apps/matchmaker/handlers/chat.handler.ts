/* eslint-disable @typescript-eslint/no-misused-promises */
import { WebSocketServer } from "../../../contexts/_core/infrastructure/WebSocketServer";
import { IncomingUserChatMessageController } from "../controllers/ws/IncomingUserChatMessageController";
import { container } from "../ioc/installer";

export const register = (server: WebSocketServer) => {
  const incommingChatMessageHandler = container.get(IncomingUserChatMessageController);
  server.register("chat.message", incommingChatMessageHandler);
};
