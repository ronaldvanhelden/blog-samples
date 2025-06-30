import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { GreetingService } from "../../services/GreetingService";
import { IGreetingService } from "../../services/IGreetingService";

export class GreetingWebPart extends BaseClientSideWebPart<{}> {
  private _greetingService: IGreetingService;
  
  protected async onInit(): Promise<void> {
    this._greetingService = this.context.serviceScope.consume(GreetingService.serviceKey);
    return super.onInit();
  }

  public render(): void {
    const greeting = this._greetingService.getGreeting("Developer");
    this.domElement.innerHTML = greeting;
  }
}
