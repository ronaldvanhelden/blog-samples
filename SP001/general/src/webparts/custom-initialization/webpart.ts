import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { CorrectService } from "./CorrectService";
import { IncorrectService } from "./IncorrectService";

export default class WebPart extends BaseClientSideWebPart<{}> {
  protected async onInit(): Promise<void> {
    const childScope = this.context.serviceScope.startNewChild();

    // ✅ This is the correct way to initialize a service that depends on the MSGraphClientFactory.
    const correctService = childScope.createDefaultAndProvide(CorrectService.serviceKey);

    // You can do some initialization logic in here
    correctService.onInit();

    // ❌ This will throw an error because IncorrectService is trying to consume the MSGraphClientFactory before the service scope is finished initializing, the consume call isn't done in the callback whenFinished().
    // This will throw an error saying: Cannot consume services because the scope is not finished yet
    childScope.createDefaultAndProvide(IncorrectService.serviceKey);
  }

  public async render(): Promise<void> {
    this.domElement.innerHTML = `Initialized.`;
  }
}
