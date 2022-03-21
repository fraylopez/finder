import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { MailUpdater } from "../../../../contexts/matchmaker/candidate/application/update/MailUpdater";
import { UnknownCandidateError } from "../../../../contexts/matchmaker/candidate/domain/errors/UnknownCandidateError";
import { InvalidEmailError } from "../../../../contexts/_core/domain/InvalidEmailError";
import { ExpressController } from "../../../_core/controllers/ExpressController";

@injectable()
export class MailPatchController extends ExpressController {
  constructor(@inject(MailUpdater) private readonly updater: MailUpdater) {
    super();
    this.addHandledError(InvalidEmailError, 400);
    this.addHandledError(UnknownCandidateError, 404);
  }

  protected async run(req: Request, _res: Response) {
    const uid: string = req.params.uid;
    const mail: string = req.body.mail;
    await this.updater.update({
      uid,
      mail
    });
  }
}
