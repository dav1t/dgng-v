import Victor from "victor";
import { DGameObject } from "../core/GameObject";
import { Boundaries } from "../interfaces/boundaries";

export class Barricade extends DGameObject {
  width: number = 0;
  height: number = 0;
  color!: string;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    color: string
  ) {
    super(ctx);
    this.position = new Victor(x, y);

    this.width = w;
    this.height = h;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  getBoundaries(): Boundaries {
    return {
      height: this.height,
      width: this.width,
      left: this.position.x,
      right: this.position.x + this.width,
      top: this.position.y,
      bottom: this.position.y + this.height,
    };
  }
}
