import { Query } from './Query';
import { BusResponse } from './BusResponse';

export interface QueryHandler<Q extends Query, R extends BusResponse> {
  subscribedTo(): Query;
  handle(query: Q): Promise<R>;
}
