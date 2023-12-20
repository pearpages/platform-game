import { Vec } from "../Vec";
import { type IActor } from "./Actor";

// const wobbleSpeed = 8;
//  const wobbleDist = 0.07;

interface ICoin extends IActor {
  basePos: Vec;
  wobble: number;
}

const type = "coin";
const size = Vec.create(0.6, 0.6);

const create = (pos: Vec): ICoin => {
  let basePos = pos.plus(Vec.create(0.2, 0.1));
  return createCoin(basePos, basePos, Math.random() * Math.PI * 2);
};

function createCoin(pos: Vec, basePos: Vec, wobble: number): ICoin {
  return {
    pos,
    basePos,
    wobble,
    type,
    size,
    create,
  };
}

// (Coin.prototype as any).collide = function (state: State) {
//   let filtered = state.actors.filter((a) => a != this);
//   let status: any = state.status;
//   if (!filtered.some((a) => a.type == "coin")) status = "won";
//   return createState(state.level, filtered, status);
// };

// (Coin.prototype as any).update = function (time: any) {
//   let wobble = this.wobble + time * wobbleSpeed;
//   let wobblePos = Math.sin(wobble) * wobbleDist;
//   return new Coin(
//     this.basePos.plus(createVec(0, wobblePos)),
//     this.basePos,
//     wobble
//   );
// };

const Coin = create(Vec.create(0, 0));
export { Coin };
export type { ICoin };
