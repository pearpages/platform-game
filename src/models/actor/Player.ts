import { type IActor } from "./Actor";
import { Vec } from "../Vec";
import { State } from "../State";

const playerXSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;

interface IPlayer extends IActor {
  speed: Vec;
}

const type = "player";
const size = Vec.create(0.8, 1.5);
const create: (pos: Vec) => IPlayer = (pos) =>
  createPlayer(pos.plus(Vec.create(0, -0.5)), Vec.create(0, 0));

function createPlayer(pos: Vec, speed: Vec): IPlayer {
  return {
    pos,
    speed,
    type,
    create,
    size,
    update(time: number, state: State, keys: any) {
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
      return createPlayer(pos, Vec.create(xSpeed, ySpeed));
    },
  };
}

const Player = create(Vec.create(0, 0));
export { Player };
