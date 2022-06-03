import { GameObject } from "./GameObject";

export class CollisionDetector {
  collisions: {
    o1: GameObject;
    o2: GameObject;
    cb: (deltaTime?: number) => void;
  }[] = [];

  detectCollisions(deltaTime?: number) {
    this.collisions.forEach((collision) => {
      if (collision.o1.intersects(collision.o2)) {
        collision.cb();
      }
    });
  }

  addCollision(
    o1: GameObject,
    o2: GameObject,
    cb: (deltaTime?: number) => void
  ) {
    this.collisions.push({ o1, o2, cb });
  }
}
