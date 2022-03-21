import * as http from 'http';
import Logger from "../../contexts/_core/domain/Logger";
import { container } from "./ioc/installer";
import { registerHandlers } from './handlers';
import { types } from "./ioc/types";
import { WebSocketServer } from "../../contexts/_core/infrastructure/WebSocketServer";
import { coreTypes } from "../_core/ioc/coreTypes";

export class Websocket {
  readonly port: string;
  private logger: Logger;
  private httpServer!: http.Server;
  private readonly websocketServer: WebSocketServer;

  constructor(port: string, private readonly server?: http.Server) {
    this.logger = container.get<Logger>(coreTypes.Logger);
    this.port = port;
    this.websocketServer = container.get<WebSocketServer>(types.WebSocketServer);
    registerHandlers(this.websocketServer);
  }

  async listen(): Promise<void> {
    this.httpServer = this.server || http.createServer();
    if (!this.httpServer.listening) {
      await new Promise<void>(resolve => this.httpServer.listen(this.port, resolve));
    }
    await this.websocketServer.init(this.httpServer);
    this.logger.info(`  WebSocket App is running at ws://localhost:${this.port} in ${process.env.NODE_ENV} mode`);
    this.logger.info('  Press CTRL-C to stop\n');
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
