import { interfaces } from "inversify";

export function setupEnvDependencies(container: interfaces.Container) {
  unbind(container);
  bind(container);
}

function unbind(_container: interfaces.Container) {/*  */ }

function bind(_container: interfaces.Container) {/*  */ }
