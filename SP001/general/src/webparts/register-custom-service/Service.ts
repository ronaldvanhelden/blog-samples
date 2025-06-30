import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { MSGraphClientFactory } from "@microsoft/sp-http-msgraph";

export class Service implements IService {
  public static serviceKey = ServiceKey.create<IService>("General:Service", Service);

  private _graphClientFactory: MSGraphClientFactory;

  constructor(serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {
      this._graphClientFactory = serviceScope.consume(MSGraphClientFactory.serviceKey);
    });
  }

  public async me(): Promise<string> {
    const graphClient = await this._graphClientFactory.getClient("3");

    const me = await graphClient.api("/me").get();
    return me.displayName;
  }
}

export interface IService {
  me(): Promise<string>;
}
