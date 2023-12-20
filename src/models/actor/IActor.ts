import { State } from "../State";
import { Vec } from "../Vec";

interface IActor {
  update(time: number, state: State, keys?: Record<string, boolean>): IActor;
  collide(state: State): State;
  pos: Vec;
  size: Vec;
  type: string;
}

export type { IActor };
