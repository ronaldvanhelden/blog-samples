import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { MSGraphClientFactory } from "@microsoft/sp-http-msgraph";

export class IncorrectService implements IIncorrectService {
  public static serviceKey = ServiceKey.create<IIncorrectService>("General:Service", IncorrectService);

  private _graphClientFactory: MSGraphClientFactory;

  constructor(serviceScope: ServiceScope) {
    this._graphClientFactory = serviceScope.consume(MSGraphClientFactory.serviceKey);
  }

  public onInit(): void {
    console.log("Service initialized");
  }

  public async me(): Promise<string> {
    const graphClient = await this._graphClientFactory.getClient("3");

    const me = await graphClient.api("/me").get();
    return me.displayName;
  }
}

export interface IIncorrectService {
  onInit(): void;
  me(): Promise<string>;
}
