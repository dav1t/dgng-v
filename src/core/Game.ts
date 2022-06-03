import { GameWorld } from "./GameWorld";

export class Game {
  gameWorld!: GameWorld;
  ctx: CanvasRenderingContext2D;
  onRenderCBs: ((deltaTime?: number) => void)[] = [];

  width: number = 0;
  height: number = 0;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.gameWorld = new GameWorld();
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  secondsPassed: number = 0;
  oldTimeStamp: number = 0;
  fps: number = 0;

  onRender(callback: (deltaTime?: number) => void) {
    this.onRenderCBs.push(callback);
  }

  render(timeStamp: number) {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Calculate the number of seconds passed since the last frame
    const deltaTime = (timeStamp - this.oldTimeStamp) / 1000;
    this.oldTimeStamp = timeStamp;

    // Calculate fps
    this.fps = Math.round(1 / deltaTime);

    this.gameWorld.update(deltaTime);
    this.gameWorld.draw(this.ctx);

    this.onRenderCBs.forEach((cb) => cb(deltaTime));

    // The loop function has reached it's end. Keep requesting new frames
    window.requestAnimationFrame((timeStamp) => this.render(timeStamp));
  }
}
