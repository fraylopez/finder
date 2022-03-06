import { Server } from "../../../../apps/matchmaker/backend/server";
import { DomainEvent } from "../../../_shared/domain/DomainEvent";

export interface EventExposer {
  init(server: Server): void;
  expose(event: DomainEvent): void;
}
