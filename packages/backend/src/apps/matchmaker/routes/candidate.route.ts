/* eslint-disable @typescript-eslint/no-misused-promises */
import { Application } from "express";
import { CandidatePutController } from "../controllers/CandidatePutController";
import { ChatGetController } from "../controllers/ChatGetController";
import { ChatPutController } from "../controllers/ChatPutController";
import { MailPatchController } from "../controllers/MailPatchController";
import { SwipePutController } from "../controllers/SwipePutController";
import { container } from "../ioc/installer";

export const register = (app: Application) => {
  const candidatePutController = container.get(CandidatePutController);
  app.put('/candidate/:uid', candidatePutController.request.bind(candidatePutController));

  const swipePutController = container.get(SwipePutController);
  app.put('/candidate/:uid/swipe/:cardId', swipePutController.request.bind(swipePutController));


  const mailPatchController = container.get(MailPatchController);
  app.patch('/candidate/:uid/mail', mailPatchController.request.bind(mailPatchController));

  const chatGetController = container.get(ChatGetController);
  app.get('/candidate/:uid/chat', chatGetController.request.bind(chatGetController));

  const conversationPutController = container.get(ChatPutController);
  app.put('/candidate/:uid/chat', conversationPutController.request.bind(conversationPutController));

};
