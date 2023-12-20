import type { Level } from "./Level";
import { type IActor } from "./actor";
import { type IPlayer } from "./actor/Player";

class State {
  level: Level;
  actors: IActor[];
  status: "playing" | "won" | "lost";

  constructor(level: Level, actors: IActor[], status: State["status"]) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  get player(): IPlayer {
    return this.actors.find((a) => a.type == "@") as IPlayer;
  }

  static start(level: Level) {
    return new State(level, level.startActors, "playing");
  }
}

// function overlap(actor1: any, actor2: any) {
//   return (
//     actor1.pos.x + actor1.size.x > actor2.pos.x &&
//     actor1.pos.x < actor2.pos.x + actor2.size.x &&
//     actor1.pos.y + actor1.size.y > actor2.pos.y &&
//     actor1.pos.y < actor2.pos.y + actor2.size.y
//   );
// }

// (State.prototype as any).update = function (time: any, keys: any) {
//   let actors = this.actors.map((actor: any) => actor.update(time, this, keys));
//   let newState = new State(this.level, actors, this.status);

//   if (newState.status != "playing") return newState;

//   let player = newState.player as any;
//   if (this.level.touches(player.pos, player.size, "lava")) {
//     return new State(this.level, actors, "lost");
//   }

//   for (let actor of actors) {
//     if (actor != player && overlap(actor, player)) {
//       newState = actor.collide(newState);
//     }
//   }
//   return newState;
// };

export { State };
