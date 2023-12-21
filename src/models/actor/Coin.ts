import { State } from "../State";
import { Vec } from "../Vec";
import { type IActor } from "./IActor";

const WobbleSpeed = 8;
const WobbleDist = 0.07;

class BaseClass {
  type = "coin";
  size = Vec.create(0.6, 0.6);
}

class Coin extends BaseClass implements IActor {
  pos: Vec;
  basePos: Vec;
  wobble: number;

  private constructor(pos: Vec, basePos: Vec, wobble: number) {
    super();
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }

  collide(state: State): State {
    let filtered = state.actors.filter((a) => a != this);
    let status = state.status;
    if (!filtered.some((a) => a.type == "coin")) status = "won";
    return new State(state.level, filtered, status);
  }

  update(time: number) {
    let wobble = this.wobble + time * WobbleSpeed;
    let wobblePos = Math.sin(wobble) * WobbleDist;
    return new Coin(
      this.basePos.plus(Vec.create(0, wobblePos)),
      this.basePos,
      wobble
    );
  }

  static create(pos: Vec): Coin {
    let basePos = pos.plus(Vec.create(0.2, 0.1));
    return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
  }
}

export { Coin };
