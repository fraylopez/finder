import { container } from "../config/ioc/installer";
import { types } from "../config/ioc/types";
import { EventBus } from "../contexts/_core/domain/EventBus";
import { EventHandler } from "../contexts/_core/domain/EventHandler";

export function initApp() {
  const eventHandlers: EventHandler[] = container.getAll(types.EventHandler);
  const eventBus = container.get<EventBus>(types.EventBus);
  eventHandlers.forEach(h => eventBus.subscribe(h));
}
