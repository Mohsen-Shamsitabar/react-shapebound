import clamp from "@/utilities/clamp";
import { Vector } from "sat-ts";

type PlayerMainAttributes = {
  size: number;
  maxHealth: number;
  currentHealth: number;
  speed: number;
  elementRef: HTMLDivElement | null;
  position: Vector;
  direction: Vector;
};

export type PlayerData = Omit<PlayerMainAttributes, "elementRef">;

export class Player {
  private size: PlayerMainAttributes["size"] = 48;
  private maxHealth: PlayerMainAttributes["maxHealth"] = 1;
  private currentHealth: PlayerMainAttributes["maxHealth"];
  private speed: PlayerMainAttributes["speed"] = 10;
  private position: PlayerMainAttributes["position"];
  private direction: PlayerMainAttributes["direction"];

  private elementRef: PlayerMainAttributes["elementRef"] = null;
  private maxSize: PlayerMainAttributes["size"] = 124;
  private minSize: PlayerMainAttributes["size"] = 8;

  private updateElement: ((newPlayerData: PlayerData) => void) | null = null;

  constructor(x: number = 0, y: number = 0) {
    this.position = new Vector(x, y);
    this.direction = new Vector(0, 0);
    this.currentHealth = this.maxHealth;
  }

  //#region GETTERS

  public getBounds(): DOMRect | null {
    if (!this.elementRef) return null;
    return this.elementRef.getBoundingClientRect();
  }

  public getSize(): typeof this.size {
    return this.size;
  }

  public getMaxHealth(): typeof this.maxHealth {
    return this.maxHealth;
  }

  public getCurrentHealth(): typeof this.currentHealth {
    return this.currentHealth;
  }

  public getSpeed(): typeof this.speed {
    return this.speed;
  }

  public getPosition(): typeof this.position {
    return this.position.clone();
  }

  public getDirection(): typeof this.direction {
    return this.direction.clone();
  }

  //#endregion GETTERS

  //#region SETTERS

  public setElementRef(newElementRef: typeof this.elementRef): void {
    this.elementRef = newElementRef;
  }

  public setSize(newSize: typeof this.size): void {
    this.size = newSize;
  }

  public setMaxHealth(newMaxHealth: typeof this.maxHealth): void {
    this.maxHealth = newMaxHealth;
  }

  public setCurrentHealth(newCurrentHealth: typeof this.currentHealth): void {
    this.currentHealth = newCurrentHealth;
  }

  public setSpeed(newSpeed: typeof this.speed): void {
    this.speed = newSpeed;
  }

  public setUpdateElementFn(
    newUpdateElementFn: typeof this.updateElement,
  ): void {
    this.updateElement = newUpdateElementFn;
  }

  //#endregion SETTERS

  //#region MOVEMENT

  public moveUp(): void {
    this.direction.y += -1;
  }

  public moveDown(): void {
    this.direction.y += 1;
  }

  public moveRight(): void {
    this.direction.x += 1;
  }

  public moveLeft(): void {
    this.direction.x += -1;
  }

  public stopMovement(): void {
    this.direction.x = 0;
    this.direction.y = 0;
  }

  //#endregion MOVEMENT

  // === UPDATE === //

  public update(delta: number = 1): void {
    this.direction.normalize();

    this.position.x += this.direction.x * this.speed * delta;
    this.position.y += this.direction.y * this.speed * delta;

    if (!this.updateElement) return;

    this.updateElement({
      direction: this.direction,
      maxHealth: this.maxHealth,
      currentHealth: this.currentHealth,
      position: this.position,
      size: this.size,
      speed: this.speed,
    });
  }

  //#region UTILITY

  public clampTop(value: number): void {
    this.position.y = value;
  }

  public clampRight(value: number): void {
    this.position.x = value - this.size - 1;
  }

  public clampBottom(value: number): void {
    this.position.y = value - this.size - 1;
  }

  public clampLeft(value: number): void {
    this.position.x = value;
  }

  public increaseSize(amount: typeof this.size) {
    this.size = clamp(this.minSize, this.maxSize, this.size + amount);
  }

  public decreaseSize(amount: typeof this.size) {
    this.size = clamp(this.minSize, this.maxSize, this.size - amount);
  }

  //#endregion UTILITY
}
