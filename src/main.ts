import "./style.css";
import { Level } from "./models/Level/Level";
import { State } from "./models/State";
import gameLevels from "./gameLevels";
import DOMDisplay from "./DOMDisplay";
import { pressedKeys } from "./getKeys";

function runAnimation(frameFunc: (time: number) => boolean) {
  let lastTime: number | null = null;
  function frame(time: number) {
    if (lastTime != null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      if (frameFunc(timeStep) === false) return;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function runLevel(
  level: Level,
  Display = DOMDisplay
): Promise<State["status"]> {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  return new Promise((resolve) => {
    runAnimation((time: number) => {
      state = state.update(time, pressedKeys);
      display.syncState(state);
      if (state.status == "playing") {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clear();
        resolve(state.status);
        return false;
      }
    });
  });
}

async function runGame(plans: string[], Display = DOMDisplay): Promise<void> {
  for (let level = 0; level < plans.length; ) {
    let status = await runLevel(Level.create(plans[level]), Display);
    if (status == "won") level++;
  }
  console.log("You've won!");
}

runGame(gameLevels, DOMDisplay);
