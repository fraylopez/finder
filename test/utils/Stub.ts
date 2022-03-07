import { SinonStubbedInstance } from "sinon";

export type Stub<T> = SinonStubbedInstance<T & {
  reset: () => void;
  restore: () => void;
  resetHistory: () => void;
}> & T;

