import { type IActor } from "./IActor";
import { Vec } from "../Vec";
import { State } from "../State";

const playerXSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;

class BaseClass {
  type = "player";
  size = Vec.create(0.8, 1.5);
}

class Player extends BaseClass implements IActor {
  pos: Vec;
  speed: Vec;
  constructor(pos: Vec, speed: Vec) {
    super();
    this.pos = pos;
    this.speed = speed;
  }
  collide(state: State): State {
    return state;
  }

  update(time: number, state: State, keys: Record<string, boolean>) {
    let xSpeed = 0;
    if (keys.ArrowLeft) xSpeed -= playerXSpeed;
    if (keys.ArrowRight) xSpeed += playerXSpeed;
    let pos = this.pos;
    let movedX = pos.plus(Vec.create(xSpeed * time, 0));
    if (!state.level.touches(movedX, this.size, "wall")) {
      pos = movedX;
    }

    let ySpeed = this.speed.y + time * gravity;
    let movedY = pos.plus(Vec.create(0, ySpeed * time));
    if (!state.level.touches(movedY, this.size, "wall")) {
      pos = movedY;
    } else if (keys.ArrowUp && ySpeed > 0) {
      ySpeed = -jumpSpeed;
    } else {
      ySpeed = 0;
    }
    return new Player(pos, Vec.create(xSpeed, ySpeed));
  }

  static create(pos: Vec) {
    return new Player(pos.plus(Vec.create(0, -0.5)), Vec.create(0, 0));
  }
}

export { Player };
