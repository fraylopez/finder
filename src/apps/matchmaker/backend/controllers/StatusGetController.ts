import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { injectable } from "inversify";
import { Controller } from './Controller';

@injectable()
export default class StatusGetController implements Controller {
  async run(req: Request, res: Response) {
    res.status(httpStatus.OK).send();
  }
}
