import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { Service } from "./Service";
import { MSGraphClientFactory } from "@microsoft/sp-http-msgraph";

export default class WebPart extends BaseClientSideWebPart<{}> {
  protected async onInit(): Promise<void> {
    // Parent scope (application-level services)
    const parentScope = this.context.serviceScope;

    // Create isolated child scope for this web part
    const childScope = parentScope.startNewChild();

    // Add web part-specific services
    childScope.provide(Service.serviceKey, new Service(childScope));

    // Signal that configuration is complete
    childScope.finish();

    // Now safe to consume services
    const childService1 = childScope.consume(Service.serviceKey); // ✅ Works as expected
    const childService2 = childScope.consume(Service.serviceKey); // ✅ Works as expected, will return the same instance
    childScope.consume(MSGraphClientFactory.serviceKey); // ✅ Inherited from parent

    const parentService = parentScope.consume(Service.serviceKey); // ❌ Doesn't work as expected, as this parent does not have the service registered and will create a new instance

    console.log("Are services the same?", childService1 === parentService); // false
    console.log("Are services the same?", childService1 === childService2); // true
  }

  public async render(): Promise<void> {
    this.domElement.innerHTML = `Child scope web part initialized.`;
  }
}
