import Victor from "victor";
import { UDGameObject } from "../core/GameObject";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "../utils/keys";

export class Arrow extends UDGameObject {
  color: string;

  rotation: number;

  state = {
    jump: false,
    left: false,
    right: false,
    run: false,
  };
  walkingSpeed = 200;

  constructor(
    ctx: CanvasRenderingContext2D,
    x = 0,
    y = 0,
    color = "#ffff00",
    rotation = 0
  ) {
    super(ctx);
    this.position = new Victor(x, y);
    this.velocity = new Victor(0, 0);

    this.color = color;
    this.rotation = rotation;
    this.hasGravity = true;

    this.setEvents();
  }

  setEvents() {
    this.context.canvas.addEventListener("click", () => {
      this.state.jump = true;
    });

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

  update(deltaTime: number): void {
    // this.rotation += 4 * deltaTime;
    this.position.add(
      this.velocity.clone().multiply(new Victor(deltaTime, deltaTime))
    );

    // FLOOR
    if (this.position.y + 100 > this.context.canvas.height) {
      this.velocity.y = 0;
      this.position.y = this.context.canvas.height - 100;
    }

    if (this.state.jump && this.velocity.y === 0) {
      this.velocity.y = -500;
      this.state.jump = false;
    }

    if (this.state.right) {
      this.velocity.x = this.walkingSpeed;
    }

    if (this.state.left) {
      this.velocity.x = -this.walkingSpeed;
    }

    if (this.state.run) {
      this.velocity.x = -200;
    }

    this.velocity.x *= 0.9;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const [x, y] = this.position.toArray();

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.rotation);
    ctx.lineWidth = 2;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(-50, -25);
    ctx.lineTo(0, -25);
    ctx.lineTo(0, -50);
    ctx.lineTo(50, 0);
    ctx.lineTo(0, 50);
    ctx.lineTo(0, 25);
    ctx.lineTo(-50, 25);
    ctx.lineTo(-50, -25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}
