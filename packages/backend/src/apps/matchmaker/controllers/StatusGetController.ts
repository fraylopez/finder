import { Request, Response } from 'express';
import { injectable } from "inversify";
import { Controller } from '../../_core/controllers/Controller';

@injectable()
export class StatusGetController extends Controller {
  protected run(_req: Request, _res: Response) {
    return;
  }
}
