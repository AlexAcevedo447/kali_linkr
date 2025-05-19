import "reflect-metadata";
import { Binding } from "./interfaces/binding";
import { Token } from "./interfaces/token";
import { Constructor } from "./interfaces/constructor";

export class Container {
  constructor(private bindings: Map<Token<any>, Binding<any>>) {}

  public resolve<T>(tokenOrType: Token<T>): Constructor<T> {
    const binding = this.bindings.get(tokenOrType);

    const Target = binding?.useClass ?? tokenOrType;

    if (typeof Target !== "function") {
      throw new Error(`Cannot resolve dependency: ${String(tokenOrType)}`);
    }

    const paramTypes: Constructor[] =
      Reflect.getMetadata("design:paramtypes", Target) || [];

    const dependencies = paramTypes.map((dep) => this.resolve(dep));

    return new Target(...dependencies);
  }
}
