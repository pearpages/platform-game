import { ActorLavaChar, type Char } from "./Plan";
import { type IActor } from "./actor";
import { Vec } from "./Vec";
import { Coin } from "./actor/Coin";
import { Lava } from "./actor/Lava";
import { Player } from "./actor/Player";

export function createActor(ch: Char, pos: Vec): IActor {
  switch (ch) {
    case "o":
      return Coin.create(pos);
    case "@":
      return Player.create(pos);
    default:
      return Lava.create(pos, ch as ActorLavaChar);
  }
}
export type StaticMapElement = "lava" | "empty" | "wall";
