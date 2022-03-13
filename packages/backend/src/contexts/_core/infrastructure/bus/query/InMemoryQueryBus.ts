import { Query } from "../../../domain/bus/Query";
import { BusResponse } from "../../../domain/bus/BusResponse";
import { QueryBus } from "../../../domain/bus/QueryBus";
import { QueryHandlersInformation } from "./QueryHandlersInformation";

export class InMemoryQueryBus implements QueryBus {
  constructor(private queryHandlersInformation: QueryHandlersInformation) { }

  async ask<R extends BusResponse>(query: Query): Promise<R> {
    const handler = this.queryHandlersInformation.search(query);
    return handler.handle(query) as Promise<R>;
  }
}
