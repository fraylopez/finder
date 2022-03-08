import { Request, Response } from 'express';
import { injectable } from "inversify";
import { Controller } from './Controller';

@injectable()
export class StatusGetController extends Controller {
  constructor() {
    super();
  }
  protected async run(req: Request, res: Response) {
    return;
  }
}
