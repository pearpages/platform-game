import { type IActor } from "./IActor";
import { Vec } from "../Vec";
import { State } from "../State";
import { type IKeys } from "../IKeys";
import config from "../../config";

const {
  actors: { player },
} = config;

class BaseClass {
  type = "player";
  size = Vec.create(player.size.x, player.size.y);
}

class Player extends BaseClass implements IActor {
  pos: Vec;
  speed: Vec;

  private constructor(pos: Vec, speed: Vec) {
    super();
    this.pos = pos;
    this.speed = speed;
  }
  collide(state: State): State {
    return state;
  }

  update(time: number, state: State, keys: Partial<IKeys>) {
    let xSpeed = 0;
    if (keys.left) xSpeed -= player.playerXSpeed;
    if (keys.right) xSpeed += player.playerXSpeed;
    let pos = this.pos;
    let movedX = pos.plus(Vec.create(xSpeed * time, 0));
    if (!state.level.touches(movedX, this.size, "wall")) {
      pos = movedX;
    }

    let ySpeed = this.speed.y + time * player.gravity;
    let movedY = pos.plus(Vec.create(0, ySpeed * time));
    if (!state.level.touches(movedY, this.size, "wall")) {
      pos = movedY;
    } else if (keys.up && ySpeed > 0) {
      ySpeed = -player.jumpSpeed;
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
