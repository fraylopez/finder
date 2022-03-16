import bodyParser from 'body-parser';
import compress from 'compression';
import errorHandler from 'errorhandler';
import express, { } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import cors from 'cors';
import Logger from "../../contexts/_core/domain/Logger";
import { container } from "./ioc/installer";
import { types } from "./ioc/types";
import { registerRoutes } from './routes';
import { registerHandlers } from './handlers';
import { coreTypes } from "../_core/ioc/coreTypes";
import { WebSocketServer } from "ws";

export class Server {
  private express: express.Express;
  readonly port: string;
  private logger: Logger;
  private httpServer!: http.Server;
  readonly websocketServer: http.Server;

  constructor(port: string) {
    this.port = port;
    this.logger = container.get(coreTypes.Logger);
    this.express = express();
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(cors());
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: 'deny' }));
    this.express.use(compress());
    const router = Router();
    router.use(errorHandler());
    this.express.use(router);

    this.websocketServer = http.createServer();

    registerRoutes(router);
    registerHandlers(new WebSocketServer({ server: this.websocketServer }));
  }

  async listen(): Promise<void> {
    await new Promise<void>(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        this.logger.info(
          `  App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`
        );
        resolve();
      });
    });
    await new Promise<void>(resolve => {
      this.websocketServer.listen(this.port, () => {
        this.logger.info(
          `  WebSocket is running at ws://localhost:${this.port} in ${this.express.get('env')} mode`
        );
        resolve();
      });
    });
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
