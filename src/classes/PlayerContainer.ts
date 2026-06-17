import clamp from "@/utilities/clamp";

type PlayerContainerMainAttributes = {
  size: number;
  elementRef: HTMLDivElement | null;
};

export type PlayerContainerData = Omit<
  PlayerContainerMainAttributes,
  "elementRef"
>;

export class PlayerContainer {
  private size: PlayerContainerMainAttributes["size"] = 512;

  private elementRef: PlayerContainerMainAttributes["elementRef"] = null;
  private maxSize: PlayerContainerMainAttributes["size"] = 640;
  private minSize: PlayerContainerMainAttributes["size"] = 384;

  private updateElement:
    | ((newPlayerContainerData: PlayerContainerData) => void)
    | null = null;

  constructor() {}

  //#region GETTERS

  public getBounds(): DOMRect | null {
    if (!this.elementRef) return null;
    return this.elementRef.getBoundingClientRect();
  }

  public getSize(): typeof this.size {
    return this.size;
  }

  //#endregion GETTERS

  //#region SETTERS

  public setElementRef(newElementRef: typeof this.elementRef): void {
    this.elementRef = newElementRef;
  }

  public setSize(newSize: typeof this.size): void {
    this.size = newSize;
  }

  public setUpdateElementFn(
    newUpdateElementFn: typeof this.updateElement,
  ): void {
    this.updateElement = newUpdateElementFn;
  }

  //#endregion SETTERS

  // === UPDATE === //

  public update(): void {
    if (!this.updateElement) return;

    this.updateElement({
      size: this.size,
    });
  }

  //#region UTILITY

  public increaseSize(amount: typeof this.size) {
    this.size = clamp(this.minSize, this.maxSize, this.size + amount);
    this.update();
  }

  public decreaseSize(amount: typeof this.size) {
    this.size = clamp(this.minSize, this.maxSize, this.size - amount);
    this.update();
  }

  //#endregion UTILITY
}
