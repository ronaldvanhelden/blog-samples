import { ServiceKey } from "@microsoft/sp-core-library";

export class Service implements IService {
  public static readonly serviceKey: ServiceKey<IService> =
    ServiceKey.create<IService>("Service:IService", Service);

  private static _random = Math.random();

  public name(): string {
    return "Random " + Service._random;
  }
}

export interface IService {
  name(): string;
}
