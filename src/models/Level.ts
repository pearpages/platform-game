import { type Char, type Plan } from "./Plan";
import { type IActor } from "./actor";
import { Vec } from "./Vec";
import { type StaticMapElement, createActor } from "./createActor";

class Level {
  height: number;
  width: number;
  startActors: IActor[];
  rows: StaticMapElement[][];

  private constructor(plan: Plan) {
    let rows = plan
      .trim()
      .split("\n")
      .map((l) => [...l]);

    this.height = rows.length;
    this.width = rows[0].length;

    this.startActors = [];
    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        if (["#", "+", "."].includes(ch)) {
          return { "#": "wall", "+": "lava", ".": "empty" }[
            ch
          ] as StaticMapElement;
        }
        this.startActors.push(createActor(ch as Char, Vec.create(x, y)));
        return "empty";
      });
    });
  }

  touches(pos: Vec, size: Vec, type: string): boolean {
    let xStart = Math.floor(pos.x);
    let xEnd = Math.ceil(pos.x + size.x);
    let yStart = Math.floor(pos.y);
    let yEnd = Math.ceil(pos.y + size.y);

    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
        let here = isOutside ? "wall" : this.rows[y][x];
        if (here == type) return true;
      }
    }
    return false;
  }

  static create(plan: Plan): Level {
    return new Level(plan);
  }
}

export { Level };
