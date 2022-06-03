import Victor from "victor";
import { DGameObject, UDGameObject, UGameObject } from "./GameObject";

export class GameWorld {
  updateObjects: UGameObject[] = [];
  drawObjects: DGameObject[] = [];

  // TODO move to options in constructor
  gravity: number = 9;

  constructor() {}

  add(obj: UGameObject | DGameObject | UDGameObject) {
    if (obj instanceof UDGameObject) {
      this.updateObjects.push(obj);
      this.drawObjects.push(obj);
      return;
    }
    if (obj instanceof UGameObject) {
      this.updateObjects.push(obj);
    } else if (obj instanceof DGameObject) {
      this.drawObjects.push(obj);
    }
  }

  update(deltaTime: number) {
    this.updateObjects.forEach((obj) => {
      if (obj.hasGravity) {
        obj.velocity.addY(new Victor(0, this.gravity));
      }
      obj.update(deltaTime);
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.drawObjects.forEach((obj) => obj.draw(ctx));
  }
}
