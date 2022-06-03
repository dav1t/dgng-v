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
    const boundaries = this.getBoundaries();

    return (
      boundaries.left < obj.getBoundaries().right &&
      boundaries.right > obj.getBoundaries().left &&
      boundaries.top < obj.getBoundaries().bottom &&
      boundaries.bottom > obj.getBoundaries().top
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

export abstract class UDGameObject extends UGameObject implements Drawable {
  abstract draw(ctx: CanvasRenderingContext2D): void;
}
