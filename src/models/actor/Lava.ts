import { Vec } from "../Vec";
import { type ActorLavaChar } from "../Level/Plan";
import { IActor } from "./IActor";
import { State } from "../State";

class BaseClass {
  size = Vec.create(1, 1);
  type = "lava";
}

class Lava extends BaseClass implements IActor {
  pos: Vec;
  speed: Vec;
  reset?: Vec;

  private constructor(pos: Vec, speed: Vec, reset?: Vec) {
    super();
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  collide(state: State) {
    return new State(state.level, state.actors, "lost");
  }

  update(time: number, state: State): Lava {
    let newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "wall")) {
      return new Lava(newPos, this.speed, this.reset);
    } else if (this.reset) {
      return new Lava(this.reset, this.speed, this.reset);
    } else {
      return new Lava(this.pos, this.speed.times(-1));
    }
  }

  static create(pos: Vec, ch?: ActorLavaChar) {
    if (ch == "=") {
      return new Lava(pos, Vec.create(2, 0));
    }
    if (ch == "|") {
      return new Lava(pos, Vec.create(0, 2));
    }
    if (ch == "v") {
      return new Lava(pos, Vec.create(0, 3), pos);
    }
    return new Lava(pos, Vec.create(0, 3), pos);
  }
}

export { Lava };
