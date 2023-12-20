import "./style.css";
import { Level } from "./models/Level";
import { State } from "./models/State";
import simpleLevelPlan from "./simplePlan";
import DOMDisplay from "./DOMDisplay";

function trackKeys(keys: any[]) {
  let down = Object.create(null);
  function track(event: any) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type == "keydown";
      event.preventDefault();
    }
  }
  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);
  return down;
}

const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

function runAnimation(frameFunc: any) {
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

function runLevel(level: Level, Display = DOMDisplay) {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  return new Promise((resolve) => {
    runAnimation((time: number) => {
      state = state.update(time, arrowKeys);
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

async function runGame(plans = [simpleLevelPlan], Display = DOMDisplay) {
  for (let level = 0; level < plans.length; ) {
    let status = await runLevel(Level.create(plans[level]), Display);
    if (status == "won") level++;
  }
  console.log("You've won!");
}

runGame([simpleLevelPlan], DOMDisplay);
