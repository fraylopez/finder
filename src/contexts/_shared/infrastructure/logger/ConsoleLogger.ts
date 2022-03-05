import { injectable } from "inversify";
import Logger from "../../domain/Logger";

@injectable()
export class ConsoleLogger implements Logger {
  debug(message: string): void {
    console.log(message);
  }
  error(message: string | Error): void {
    console.error(message);
  }
  info(message: string): void {
    console.log(message);
  }


}