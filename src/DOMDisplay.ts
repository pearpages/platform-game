import { State } from "./models/State";
import { Level } from "./models/Level/Level";
import { IActor } from "./models/actor/IActor";
import config from "./config";

const { scale } = config;

function createHTMLElement(
  name: string,
  attrs: Record<string, string>,
  ...children: HTMLElement[]
): HTMLElement {
  let dom = document.createElement(name);
  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }
  for (let child of children) {
    dom.appendChild(child);
  }
  return dom;
}

function drawGrid(level: Level): HTMLElement {
  return createHTMLElement(
    "table",
    {
      class: "background",
      style: `width: ${level.width * scale}px`,
    },
    ...level.rows.map((row) =>
      createHTMLElement(
        "tr",
        { style: `height: ${scale}px` },
        ...row.map((type) => createHTMLElement("td", { class: type }))
      )
    )
  );
}

function drawActors(actors: IActor[]): HTMLElement {
  return createHTMLElement(
    "div",
    {},
    ...actors.map((actor) => {
      let rect = createHTMLElement("div", { class: `actor ${actor.type}` });
      rect.style.width = `${actor.size.x * scale}px`;
      rect.style.height = `${actor.size.y * scale}px`;
      rect.style.left = `${actor.pos.x * scale}px`;
      rect.style.top = `${actor.pos.y * scale}px`;
      return rect;
    })
  );
}

export default class DOMDisplay {
  dom: HTMLElement;
  actorLayer: HTMLElement | null;
  constructor(parent: HTMLElement, level: Level) {
    this.dom = createHTMLElement("div", { class: "game" }, drawGrid(level));
    this.actorLayer = null;
    parent.appendChild(this.dom);
  }

  clear() {
    this.dom.remove();
  }

  scrollPlayerIntoView(state: State) {
    let width = this.dom.clientWidth;
    let height = this.dom.clientHeight;
    let margin = width / 3;

    // The viewport
    let left = this.dom.scrollLeft,
      right = left + width;
    let top = this.dom.scrollTop,
      bottom = top + height;

    let player = state.player;
    let center = player.pos.plus(player.size.times(0.5)).times(scale);

    if (center.x < left + margin) {
      this.dom.scrollLeft = center.x - margin;
    } else if (center.x > right - margin) {
      this.dom.scrollLeft = center.x + margin - width;
    }
    if (center.y < top + margin) {
      this.dom.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
      this.dom.scrollTop = center.y + margin - height;
    }
  }

  syncState(state: State) {
    if (this.actorLayer) {
      this.actorLayer.remove();
    }
    this.actorLayer = drawActors(state.actors);
    this.dom.appendChild(this.actorLayer);
    this.dom.className = `game ${state.status}`;
    this.scrollPlayerIntoView(state);
  }
}
