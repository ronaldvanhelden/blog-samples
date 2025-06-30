import { IGreetingService } from "../../services/IGreetingService";

export class MockGreetingService implements IGreetingService {
  public getGreeting(name: string): string {
    return `Hello, ${name}! This is a test.`;
  }
}
