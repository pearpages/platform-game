import { type Char } from "./Plan";
import { Vec } from "../Vec";
import { Coin } from "../actor/Coin";
import { Lava } from "../actor/Lava";
import { Player } from "../actor/Player";
import { type IActor } from "../actor/IActor";

interface IWithActorCreate {
  // new (...args: any[]): IActor; // In case we also want that _new_ to be public
  create(pos: Vec, ch?: Char): IActor;
}

export function createActor(ch: Char): IWithActorCreate {
  switch (ch) {
    case "o":
      return Coin;
    case "@":
      return Player;
    default:
      return Lava;
  }
}
export type StaticMapElement = "lava" | "empty" | "wall";
