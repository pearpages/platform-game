import { type ActorLavaChar } from "../Plan";
import { Vec } from "../Vec";

interface IActor {
  create: (pos: Vec, char?: ActorLavaChar) => IActor;
  pos: Vec;
  size: Vec;
  type: string;
}

export type { IActor };
