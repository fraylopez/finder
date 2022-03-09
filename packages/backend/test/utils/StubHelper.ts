// eslint-disable-next-line max-classes-per-file
import { StubbableType } from "sinon";
import sinon, { ObjectMethodsMap, stubInterface } from "ts-sinon";
import { Stub } from "./Stub";

export class StubHelper {
  static sandbox: sinon.SinonSandbox = sinon.createSandbox();
  static sandboxes: Map<object, sinon.SinonSandbox> = new Map();

  static fromInterface<T extends object>(setupMethodsInitialization?: ObjectMethodsMap<T>): Stub<T> {
    return stubInterface(setupMethodsInitialization) as Stub<T>;
  }
  static fromClass<T extends object>(type: StubbableType<T>): Stub<T> {
    return this.sandbox.createStubInstance(type) as Stub<T>;
  }
  static stubPrototype<T extends object>(type: { prototype: object; }): Stub<T> {
    const customSandbox = sinon.createSandbox();
    this.sandboxes.set(type.prototype, customSandbox);
    const stub = customSandbox.stub<T>(
      type.prototype as T
    );
    Object.keys(customSandbox).forEach((k: string) => {
      if (typeof (customSandbox as any)[k] === "function") {
        (stub as any)[k] = (customSandbox as any)[k].bind(customSandbox);
      }
    });
    return stub as Stub<T>;
  }


  static reset() {
    this.sandbox.reset();
    this.sandboxes.forEach(v => v.reset());
  }
  static resetHystory() {
    this.sandbox.reset();
    this.sandboxes.forEach(v => v.resetHistory());
  }

  static restore() {
    this.sandbox.restore();
    this.sandboxes.forEach(v => v.restore());
  }
}

export class SpyHelper {
  static sandbox: sinon.SinonSandbox = sinon.createSandbox();
  static sandboxes: Map<object, sinon.SinonSandbox> = new Map();

  static spyPrototype<T extends object>(type: { prototype: object; }): sinon.SinonSpiedInstance<T> & T {
    const customSandbox = sinon.createSandbox();
    this.sandboxes.set(type.prototype, customSandbox);
    return customSandbox.spy<T>(type.prototype as T) as unknown as sinon.SinonSpiedInstance<T> & T;
  }

  static reset() {
    this.sandbox.reset();
    this.sandboxes.forEach(v => v.reset());
  }
  static resetHystory() {
    this.sandbox.reset();
    this.sandboxes.forEach(v => v.resetHistory());
  }

  static restore() {
    this.sandbox.restore();
    this.sandboxes.forEach(v => v.restore());
  }
}