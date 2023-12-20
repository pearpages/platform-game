import type { Level } from "./Level/Level";
import { type IActor } from "./actor/IActor";
import { Player } from "./actor/Player";

function overlap(actor1: IActor, actor2: IActor): boolean {
  return (
    actor1.pos.x + actor1.size.x > actor2.pos.x &&
    actor1.pos.x < actor2.pos.x + actor2.size.x &&
    actor1.pos.y + actor1.size.y > actor2.pos.y &&
    actor1.pos.y < actor2.pos.y + actor2.size.y
  );
}

class State {
  level: Level;
  actors: IActor[];
  status: "playing" | "won" | "lost";

  constructor(level: Level, actors: IActor[], status: State["status"]) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  get player(): Player {
    return this.actors.find((a) => a.type == "player") as Player;
  }

  update(time: number, keys: Record<string, boolean>): State {
    let actors: IActor[] = this.actors.map((actor: IActor) =>
      actor.update(time, this, keys)
    );
    let newState = new State(this.level, actors, this.status);

    if (newState.status != "playing") {
      return newState;
    }

    let player = newState.player as Player;
    if (this.level.touches(player.pos, player.size, "lava")) {
      return new State(this.level, actors, "lost");
    }

    for (let actor of actors) {
      if (actor != player && overlap(actor, player)) {
        newState = actor.collide(newState);
      }
    }
    return newState;
  }

  static start(level: Level): State {
    return new State(level, level.startActors, "playing");
  }
}

export { State };
