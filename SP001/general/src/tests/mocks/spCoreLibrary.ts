// Mock ServiceScope implementation
export class ServiceScope {
  private _services: Map<any, any>;
  private _finished = false;
  private _finishedCallbacks: Array<() => void> = [];

  constructor() {
    this._services = new Map<any, any>();
  }

  public provide<T>(serviceKey: ServiceKey<T>, serviceClassOrInstance: any): void {
    if (this._finished) {
      throw new Error("Cannot provide services after scope is finished");
    }
    this._services.set(serviceKey, serviceClassOrInstance);
  }

  public static startNewRoot(): ServiceScope {
    return new ServiceScope();
  }

  public static createTestScope(): ServiceScope {
    return new ServiceScope();
  }

  public consume<T>(serviceKey: ServiceKey<T>): T {
    const serviceClass = this._services.get(serviceKey);
    if (!serviceClass) {
      throw new Error(`Service not found for key: ${serviceKey.name}`);
    }

    if (typeof serviceClass === "function") {
      return new serviceClass(this);
    }
    return serviceClass;
  }

  public whenFinished(callback: () => void): void {
    if (this._finished) {
      callback();
    } else {
      this._finishedCallbacks.push(callback);
    }
  }

  public finish(): void {
    this._finished = true;
    this._finishedCallbacks.forEach((callback) => callback());
    this._finishedCallbacks = [];
  }

  public startNewChild(): ServiceScope {
    const child = new ServiceScope();
    // Copy parent services to child
    this._services.forEach((value, key) => {
      child._services.set(key, value);
    });
    return child;
  }
}

// Mock ServiceKey implementation
export class ServiceKey<T> {
  public readonly name: string;
  public readonly id: string;

  constructor(name: string, defaultCreator?: new (...args: any[]) => T) {
    this.name = name;
    this.id = Math.random().toString(36).substr(2, 9);
  }

  public static create<T>(name: string, defaultCreator: new (...args: any[]) => T): ServiceKey<T> {
    return new ServiceKey<T>(name, defaultCreator);
  }

  public toString(): string {
    return this.name;
  }
}

// Mock Version class
export class Version {
  private _version: string;

  constructor(version: string) {
    this._version = version;
  }

  public static parse(version: string): Version {
    return new Version(version);
  }

  public toString(): string {
    return this._version;
  }
}
