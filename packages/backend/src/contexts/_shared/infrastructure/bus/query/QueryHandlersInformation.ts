import { Query } from "../../../domain/bus/Query";
import { BusResponse } from "../../../domain/bus/BusResponse";
import { QueryHandler } from "../../../domain/bus/QueryHandler";
import { QueryNotRegisteredError } from "../../../domain/bus/QueryNotRegisteredError";

export class QueryHandlersInformation {
  private queryHandlersMap: Map<Query, QueryHandler<Query, BusResponse>>;

  constructor(queryHandlers: Array<QueryHandler<Query, BusResponse>>) {
    this.queryHandlersMap = this.formatHandlers(queryHandlers);
  }

  private formatHandlers(
    queryHandlers: Array<QueryHandler<Query, BusResponse>>
  ): Map<Query, QueryHandler<Query, BusResponse>> {
    const handlersMap = new Map();

    queryHandlers.forEach(queryHandler => {
      handlersMap.set(queryHandler.subscribedTo(), queryHandler);
    });

    return handlersMap;
  }

  public search(query: Query): QueryHandler<Query, BusResponse> {
    const queryHandler = this.queryHandlersMap.get(query.constructor);

    if (!queryHandler) {
      throw new QueryNotRegisteredError(query);
    }

    return queryHandler;
  }
}
