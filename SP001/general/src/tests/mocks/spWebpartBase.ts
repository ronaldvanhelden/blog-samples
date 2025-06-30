import { WebPartContext } from "@microsoft/sp-webpart-base";

export class BaseClientSideWebPart implements IUnitTestableWebPart {
  protected domElement: HTMLElement;
  public context: WebPartContext;

  protected onInit(): Promise<void> {
    return Promise.resolve();
  }

  public render(): void {}

  public async initialize(context: WebPartContext, domElement: HTMLElement): Promise<void> {
    this.context = context;
    this.domElement = domElement;

    await this.onInit();
  }

  public executeRender(): HTMLElement {
    this.render();
    return this.domElement;
  }
}

export interface IUnitTestableWebPart {
  initialize(context: WebPartContext, domElement?: HTMLElement): Promise<void>;
  executeRender(): HTMLElement;
}
