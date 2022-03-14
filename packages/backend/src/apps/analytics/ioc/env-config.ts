import { Container } from "inversify";

export function setupEnvDependencies(container: Container) {
  unbind(container);
  bind(container);
}

function unbind(_container: Container) {/*  */ }

function bind(_container: Container) {/*  */ }
