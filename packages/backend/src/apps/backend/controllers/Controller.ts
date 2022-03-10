import { Request, Response } from 'express';
import httpStatus from "http-status";
import { injectable } from "inversify";
import { DomainErrorConstructor } from "../../../contexts/_shared/domain/bus/DomainErrorConstructor";

@injectable()
export abstract class Controller {
  private readonly errors: Map<DomainErrorConstructor, { status: number, message?: string; }> = new Map();
  async request(req: Request, res: Response): Promise<void> {
    res.header('Access-Control-Allow-Origin', '*');
    try {
      const result = await this.run(req, res);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      const handledError = this.errors.get(error.constructor);
      if (handledError) {
        res.status(handledError.status).send({ message: handledError.message || error.message });
      } else {
        // console.log(error.stack);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Sorry about that..." });
      }
    }
  }
  protected abstract run(req: Request, res: Response): any | Promise<any>;

  protected addHandledError(errorKlass: DomainErrorConstructor, status: number, message?: string) {
    this.errors.set(errorKlass, { status, message });
  }
}
