/* eslint-disable @typescript-eslint/no-misused-promises */
import { Application } from "express";
import { ConversationPatchController } from "../controllers/ConversationPatchController";
import { ConversationPostController } from "../controllers/ConversationPostController";
import { container } from "../ioc/installer";

export const register = (app: Application) => {
  const conversationPostController = container.get(ConversationPostController);
  app.post('/chat/:id', conversationPostController.request.bind(conversationPostController));

  const conversationPatchController = container.get(ConversationPatchController);
  app.patch('/chat/:id', conversationPatchController.request.bind(conversationPatchController));
};
