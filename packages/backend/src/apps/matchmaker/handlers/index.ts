/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import glob from 'glob';
import { WebSocketServer } from "ws";

export function registerHandlers(server: WebSocketServer) {
  const handlers = glob.sync(__dirname + '/**/*.handler.*');
  handlers.map(handler => register(handler, server));
}

function register(handlerPath: string, server: WebSocketServer) {
  const handler = require(handlerPath);
  handler.register(server);
}
