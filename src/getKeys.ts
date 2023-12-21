import { type IKeys } from "./models/IKeys";

function getKeyName(key: string): "up" | "right" | "left" {
  if (["ArrowLeft", "k"].includes(key)) {
    return "left";
  }
  if (["ArrowRight", "ñ"].includes(key)) {
    return "right";
  }
  return "up";
}

function trackKeys(keys: string[]): Partial<IKeys> {
  let down = Object.create(null);
  function track(event: KeyboardEvent) {
    if (keys.includes(event.key)) {
      down[getKeyName(event.key)] = event.type == "keydown";
      event.preventDefault();
    }
  }
  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);
  return down;
}

const pressedKeys = trackKeys([
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "k",
  "o",
  "ñ",
]);

export { pressedKeys };
