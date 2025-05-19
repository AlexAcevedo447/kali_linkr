import { Constructor } from "./constructor";

export interface Binding<T = any> {
  useClass: Constructor<T>;
}
