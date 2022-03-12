import { types } from "./types";

type Newable<T> = new (...args: never[]) => T;
interface Abstract<T> {
  prototype: T;
}
type ServiceIdentifier<T = unknown> = (string | symbol | Newable<T> | Abstract<T>);

export class MapContainer {

  private map: Map<any, any>;
  constructor() {
    this.map = new Map();
  }

  bind(id: any, service: any) {
    this.map.set(id, service);
  }
  bindAnother(id: any, service: any) {
    const current = this.map.get(id) || [];
    current.push(service);
    this.map.set(id, current);
  }
  get<T>(id: ServiceIdentifier<T>) {
    return this.map.get(id) as T;
  }
  getAll<T>(id: types): T[] {
    const services = this.map.get(id);
    return Array.isArray(services) ? services : [services];
  }
}
