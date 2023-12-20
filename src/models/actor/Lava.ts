import { Vec } from "../Vec";
import { type ActorLavaChar } from "../Plan";
import { IActor } from ".";
import { State } from "../State";

interface ILava extends IActor {
  speed: Vec;
  reset?: Vec;
  collide: (state: State) => State;
}

const size = Vec.create(1, 1);
const type = "lava";

const create = (pos: Vec, ch?: ActorLavaChar) => {
  if (ch == "=") {
    return createLava(pos, Vec.create(2, 0));
  }
  if (ch == "|") {
    return createLava(pos, Vec.create(0, 2));
  }
  if (ch == "v") {
    return createLava(pos, Vec.create(0, 3), pos);
  }
  return createLava(pos, Vec.create(0, 3), pos);
};

function collide(state: State) {
  return new State(state.level, state.actors, "lost");
}

function createLava(pos: Vec, speed: Vec, reset?: Vec): ILava {
  return {
    pos,
    speed,
    reset,
    size,
    type,
    create,
    collide,
    update(time: number, state: State): ILava {
      let newPos = this.pos.plus(this.speed.times(time));
      if (!state.level.touches(newPos, this.size, "wall")) {
        return createLava(newPos, this.speed, this.reset);
      } else if (this.reset) {
        return createLava(this.reset, this.speed, this.reset);
      } else {
        return createLava(this.pos, this.speed.times(-1));
      }
    },
  };
}

const Lava = create(Vec.create(0, 0), "=");
export { Lava };
