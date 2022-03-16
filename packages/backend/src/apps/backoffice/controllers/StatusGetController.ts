import { Request, Response } from 'express';
import { injectable } from "inversify";
import { ExpressController } from "../../_core/controllers/ExpressController";

@injectable()
export class StatusGetController extends ExpressController {
  protected run(_req: Request, _res: Response) {
    return;
  }
}
