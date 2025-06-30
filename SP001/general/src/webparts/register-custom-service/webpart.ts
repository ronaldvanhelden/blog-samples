import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IService, Service } from "./Service";

export default class WebPart extends BaseClientSideWebPart<{}> {
  private _service: IService;
  protected async onInit(): Promise<void> {
    this._service = this.context.serviceScope.consume(Service.serviceKey);
  }

  public async render(): Promise<void> {
    const me = await this._service.me();

    this.domElement.innerHTML = `Hi ${me}`;
  }
}
