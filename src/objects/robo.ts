import Victor from "victor";
import { UDGameObject } from "../core/GameObject";
import { Boundaries } from "../interfaces/boundaries";
import { ArrowUp, ArrowRight, ArrowLeft } from "../utils/keys";
import { loadSprite } from "../utils/sprite-loader";

export class Robo extends UDGameObject {
  state = {
    jump: false,
    left: false,
    right: false,
    run: false,
  };
  loaded: boolean = false;

  sprite!: HTMLImageElement;
  spriteSheets: {
    width: number;
    height: number;
    frames: { x: number; y: number; w: number; h: number }[];
  }[] = [];

  get spriteSheet(): { width: number; height: number; frames: any[] } {
    return this.spriteSheets[this.spriteSheetIndex];
  }

  getBoundaries(): Boundaries {
    const { w, h } = this.spriteSheet.frames[Math.floor(this.currentFrame)];

    return {
      height: h,
      width: w,
      left: this.position.x,
      right: this.position.x + w,
      top: this.position.y,
      bottom: this.position.y + h,
    };
  }

  walkingSpeed = 300;
  frameChangeSpeed = 12;

  currentFrame: number = 0;
  spriteSheetIndex: number = 0;

  constructor(context: CanvasRenderingContext2D) {
    super(context);

    this.position = new Victor(
      context.canvas.width / 2,
      context.canvas.height / 2
    );

    this.velocity = new Victor(0, 0);
    this.hasGravity = true;

    this.loadSprites();
    this.setEvents();
  }

  setEvents(): void {
    window.addEventListener("keydown", ({ key }) => {
      if (ArrowUp.has(key)) {
        this.state.jump = true;
      }
      if (ArrowRight.has(key)) {
        this.state.right = true;
      }
      if (ArrowLeft.has(key)) {
        this.state.left = true;
      }
    });

    window.addEventListener("keyup", ({ key }) => {
      if (ArrowUp.has(key)) {
        this.state.jump = false;
      }
      if (ArrowRight.has(key)) {
        this.state.right = false;
      }
      if (ArrowLeft.has(key)) {
        this.state.left = false;
      }
    });
  }

  setControls(deltaTime: number) {
    if (this.state.jump && this.velocity.y === 0) {
      this.velocity.y = -500;
      this.state.jump = false;
    }

    if (this.state.right) {
      this.velocity.x += this.walkingSpeed;
      this.currentFrame += this.frameChangeSpeed * deltaTime;
      this.spriteSheetIndex = 0;
    }

    if (this.state.left) {
      this.velocity.x += -this.walkingSpeed;
      this.currentFrame += this.frameChangeSpeed * deltaTime;
      this.spriteSheetIndex = 1;
    }

    if (this.state.run) {
      this.velocity.x = -200;
    }

    if (this.velocity.x > this.walkingSpeed) {
      this.velocity.x = this.walkingSpeed;
    }

    if (this.velocity.x < -this.walkingSpeed) {
      this.velocity.x = -this.walkingSpeed;
    }

    if (Math.abs(Math.floor(this.velocity.x)) <= 100) {
      this.spriteSheetIndex = 2;
      this.currentFrame = 0;
    }

    if (this.hasGravity) {
      this.velocity.x *= 0.8;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const frames = this.spriteSheet.frames;

    if (this.currentFrame > frames.length - 1) {
      this.currentFrame = 0;
    }

    const { x, y, w, h } = frames[Math.floor(this.currentFrame)];

    ctx.drawImage(
      this.sprite,
      x,
      y,
      w,
      h,
      this.position.x,
      this.position.y,
      w,
      h
    );
  }

  update(deltaTime: number): void {
    this.position.add(
      this.velocity.clone().multiply(new Victor(deltaTime, deltaTime))
    );

    this.addWalls();

    this.setControls(deltaTime);
  }

  loadSprites() {
    loadSprite("/assets/robo/walking.jpeg").then((sprite) => {
      this.sprite = sprite;

      const spriteItemWidth = sprite.width / 9;
      const spriteItemHeight = sprite.height / 4;

      for (let i = 0; i < 5; i++) {
        const frames = [];

        for (let j = 0; j < 9; j++) {
          frames.push({
            x: j * spriteItemWidth,
            y: i * spriteItemHeight,
            w: spriteItemWidth,
            h: spriteItemHeight,
          });
        }

        this.spriteSheets.push({
          width: sprite.width,
          height: sprite.height,
          frames,
        });
      }

      this.loaded = true;
    });
  }

  addWalls() {
    const bound = this.getBoundaries();

    if (bound.left < 0) {
      this.position.x = 0;
    }

    if (bound.right > this.context.canvas.width) {
      this.position.x = this.context.canvas.width - bound.width;
    }

    if (bound.bottom > this.context.canvas.height) {
      this.position.y = this.context.canvas.height - bound.height;
      this.velocity.y = 0;
    }
  }
}
