import Victor from "victor";
import { Boundaries } from "../interfaces/boundaries";
import { Drawable } from "../interfaces/drawable";
import { Updatable } from "../interfaces/updatable";

export abstract class GameObject {
  context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  position!: Victor;
  velocity!: Victor;

  abstract getBoundaries(): Boundaries;

  intersects(obj: GameObject): boolean {
    const { left, right, top, bottom } = this.getBoundaries();
    const oBoundaries = obj.getBoundaries();

    return (
      left < oBoundaries.right &&
      right > oBoundaries.left &&
      top < oBoundaries.bottom &&
      bottom > oBoundaries.top
    );
  }
}

export abstract class UGameObject extends GameObject implements Updatable {
  hasGravity: boolean = false;

  abstract update(deltaTime: number): void;
}

export abstract class DGameObject extends GameObject implements Drawable {
  abstract draw(ctx: CanvasRenderingContext2D): void;
}

export abstract class UDGameObject
  extends GameObject
  implements Updatable, Drawable
{
  hasGravity: boolean = false;

  abstract update(deltaTime: number): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;
}
