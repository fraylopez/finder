/* eslint-disable @typescript-eslint/no-misused-promises */
import { Application } from "express";
import { ConversationLinePatchController } from "../controllers/ConversationLinePatchController";
import { ConversationPostController } from "../controllers/ConversationPostController";
import { container } from "../ioc/installer";

export const register = (app: Application) => {
  const conversationPostController = container.get(ConversationPostController);
  app.post('/chat/:id', conversationPostController.request.bind(conversationPostController));

  const conversationPatchController = container.get(ConversationLinePatchController);
  app.patch('/chat/:id', conversationPatchController.request.bind(conversationPatchController));
};
