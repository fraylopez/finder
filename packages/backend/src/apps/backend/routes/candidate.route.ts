import { Application } from "express";
import { CandidatePutController } from "../controllers/CandidatePutController";
import { ConversationPutController } from "../controllers/ConversationPutController";
import { MailPatchController } from "../controllers/MailPatchController";
import { SwipePutController } from "../controllers/SwipePutController";
import { container } from "../ioc/installer";

export const register = (app: Application) => {
  const candidatePutController = container.get(CandidatePutController);
  app.put('/candidate/:uid', candidatePutController.request.bind(candidatePutController));

  const swipePutController = container.get(SwipePutController);
  app.put('/candidate/:uid/swipe/:cardId', swipePutController.request.bind(swipePutController));

  const conversationPutController = container.get(ConversationPutController);
  app.put('/candidate/:uid/talk', conversationPutController.request.bind(conversationPutController));

  const mailPatchController = container.get(MailPatchController);
  app.patch('/candidate/:uid/mail', mailPatchController.request.bind(mailPatchController));
};
