import { ServiceKey } from "@microsoft/sp-core-library";
import { IGreetingService } from "./IGreetingService";

export class GreetingService implements IGreetingService {
  public static readonly serviceKey: ServiceKey<IGreetingService> = 
    ServiceKey.create<IGreetingService>("MyApp:GreetingService", GreetingService);

  public getGreeting(name: string): string {
    return `Hello, ${name}! Welcome to SPFx.`;
  }
}
