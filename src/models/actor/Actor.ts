import { State } from "../State";
import { Vec } from "../Vec";

interface IActor {
  create: (pos: Vec) => this;
  update: (time: number, state: State, keys?: any) => this;
  pos: Vec;
  size: Vec;
  type: string;
}

export type { IActor };
