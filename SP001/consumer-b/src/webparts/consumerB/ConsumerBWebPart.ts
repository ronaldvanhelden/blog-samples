import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { Service } from "library";
import { IService } from "library/lib/libraries/library/Service";

export default class WebPart extends BaseClientSideWebPart<{}> {
  private _service: IService;

  protected onInit(): Promise<void> {
    this._service = this.context.serviceScope.consume(Service.serviceKey);

    return super.onInit();
  }

  public render(): void {
    this.domElement.innerHTML = `${this._service.name()}`;
  }
}
