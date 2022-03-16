import { injectable } from "inversify";
import { DomainErrorConstructor } from "../../../contexts/_core/domain/bus/DomainErrorConstructor";

type WsMessage = any;
@injectable()
export abstract class SocketIOController {
  private readonly errors: Map<DomainErrorConstructor, { status: number, message?: string; }> = new Map();
  async handle(message: WsMessage): Promise<void> {
    try {
      await this.handle(message);
    } catch (error) {
      const handledError = this.errors.get(error.constructor);
      if (handledError) {/*  */ }
      else {/*  */ }
    }
  }
  protected abstract run(message: WsMessage): any | Promise<any>;

  protected addHandledError(errorKlass: DomainErrorConstructor, status: number, message?: string) {
    this.errors.set(errorKlass, { status, message });
  }
}
