import { Vec } from "../Vec";
import { type ActorLavaChar } from "../Plan";
import { IActor } from ".";

interface ILava extends IActor {
  speed: Vec;
  reset?: Vec;
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

function createLava(pos: Vec, speed: Vec, reset?: Vec): ILava {
  return {
    pos,
    speed,
    reset,
    size,
    type,
    create,
  };
}

// (Lava.prototype as any).collide = function (state: State) {
//   return createState(state.level, state.actors, "lost");
// };

// (Lava.prototype as any).update = function (time: any, state: any) {
//   let newPos = this.pos.plus(this.speed.times(time));
//   if (!state.level.touches(newPos, this.size, "wall")) {
//     return new Lava(newPos, this.speed, this.reset);
//   } else if (this.reset) {
//     return new Lava(this.reset, this.speed, this.reset);
//   } else {
//     return new Lava(this.pos, this.speed.times(-1));
//   }
// };

const Lava = create(Vec.create(0, 0), "=");
export { Lava };
export type { ILava };
