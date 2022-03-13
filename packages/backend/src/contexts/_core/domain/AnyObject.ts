export interface Any {
  [key: string]: any;
}
export type AnyObject<T = {}> = Any & T;