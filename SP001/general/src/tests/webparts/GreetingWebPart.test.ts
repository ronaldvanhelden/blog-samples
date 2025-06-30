import { GreetingWebPart } from "../../webparts/greeting/GreetingWebPart";
import { ServiceScope } from "@microsoft/sp-core-library";

import { GreetingService } from "../../services/GreetingService";
import { MockGreetingService } from "../mocks/MockGreetingService";
import { IUnitTestableWebPart } from "../mocks/spWebpartBase";
import { WebPartContext } from "@microsoft/sp-webpart-base";

describe("GreetingWebPart", () => {
  let webPart: GreetingWebPart;
  let unitTestWebPart: IUnitTestableWebPart;
  let serviceScope: ServiceScope;

  beforeEach(async () => {
    serviceScope = ServiceScope.startNewRoot();

    serviceScope.provide(GreetingService.serviceKey, new MockGreetingService());

    serviceScope.finish();

    webPart = new GreetingWebPart();
    unitTestWebPart = webPart as unknown as IUnitTestableWebPart;
    await unitTestWebPart.initialize({ serviceScope } as WebPartContext, document.createElement("div"));
  });

  it("should render the greeting from the mock service", async () => {
    const element = unitTestWebPart.executeRender();
    expect(element.innerHTML).toContain("Hello, Developer! This is a test.");
  });
});
