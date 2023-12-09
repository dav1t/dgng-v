import { CollisionDetector } from "./core/CollisionDetector";
import { Game } from "./core/Game";
import { Arrow } from "./objects/arrow";
import { Barricade } from "./objects/barricade";
import { Robo } from "./objects/robo";
import "./style.css";
import { isBetween } from "./utils/utils";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

canvas.height = 600;
canvas.width = canvas.height * 1.33;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const game = new Game(ctx, canvas.width, canvas.height);
const { gameWorld } = game;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const arrow = new Arrow(ctx, centerX, centerY);
const robo = new Robo(ctx);

const barricade = new Barricade(ctx, centerX - 100, centerY, 100, 100, "blue");

// gameWorld.add(arrow);
gameWorld.add(barricade);
gameWorld.add(robo);

const collisionDetector = new CollisionDetector();

collisionDetector.addCollision(robo, barricade, () => {
  const roboBounds = robo.getBoundaries();
  const barricadeBounds = barricade.getBoundaries();
  if (
    roboBounds.left < barricadeBounds.right &&
    roboBounds.right > barricadeBounds.left
  ) {
    robo.velocity.x = 0;
  }

  if (isBetween(barricadeBounds, roboBounds)) {
    if (roboBounds.top < barricadeBounds.bottom && robo.velocity.y < 0) {
      robo.velocity.y = -robo.velocity.y;
    }
  }
});

game.onRender((deltaTime) => {
  collisionDetector.detectCollisions(deltaTime);
});

window.onload = () => game.render(0);
