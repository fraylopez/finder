import { Query } from './Query';
import { BusResponse } from './BusResponse';

export interface QueryBus {
  ask<R extends BusResponse>(query: Query): Promise<R>;
}
