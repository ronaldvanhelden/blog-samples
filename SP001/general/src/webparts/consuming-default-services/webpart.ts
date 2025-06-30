import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { MSGraphClientFactory } from "@microsoft/sp-http";

export default class WebPart extends BaseClientSideWebPart<{}> {
  private _graphClientFactory: MSGraphClientFactory;

  protected async onInit(): Promise<void> {
    this._graphClientFactory = this.context.serviceScope.consume(MSGraphClientFactory.serviceKey);
  }

  public async render(): Promise<void> {
    const graphClient = await this._graphClientFactory.getClient("3");
    const me = await graphClient.api("/me").get();

    this.domElement.innerHTML = `Hi ${me.displayName}`;
  }
}
