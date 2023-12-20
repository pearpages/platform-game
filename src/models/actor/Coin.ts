import { State } from "../State";
import { Vec } from "../Vec";
import { type IActor } from "./Actor";

const wobbleSpeed = 8;
const wobbleDist = 0.07;

interface ICoin extends IActor {
  basePos: Vec;
  wobble: number;
  collide: (state: State) => State;
}

const type = "coin";
const size = Vec.create(0.6, 0.6);

const create = (pos: Vec): ICoin => {
  let basePos = pos.plus(Vec.create(0.2, 0.1));
  return createCoin(basePos, basePos, Math.random() * Math.PI * 2);
};

function collide(coin: ICoin, state: State): State {
  let filtered = state.actors.filter((a) => a != coin);
  let status = state.status;
  if (!filtered.some((a) => a.type == "coin")) status = "won";
  return new State(state.level, filtered, status);
}

function update(coin: ICoin, time: number) {
  let wobble = coin.wobble + time * wobbleSpeed;
  let wobblePos = Math.sin(wobble) * wobbleDist;
  return createCoin(
    coin.basePos.plus(Vec.create(0, wobblePos)),
    coin.basePos,
    wobble
  );
}

function createCoin(pos: Vec, basePos: Vec, wobble: number): ICoin {
  return {
    pos,
    basePos,
    wobble,
    type,
    size,
    create,
    collide(state: State) {
      return collide(this, state);
    },
    update(time: number) {
      return update(this, time);
    },
  };
}

const Coin = create(Vec.create(0, 0));
export { Coin };
