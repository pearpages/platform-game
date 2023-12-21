import "./style.css";
import { Level } from "./models/Level/Level";
import { State } from "./models/State";
import gameLevels from "./gameLevels";
import DOMDisplay from "./DOMDisplay";
import { pressedKeys } from "./getKeys";
import { manageLevelErrors, getQueryParam } from "./getInitialLevelInput";
import config from "./config";
import { watch } from "./Watch";
import { lives } from "./Lives";

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
  Display: typeof DOMDisplay
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

async function runGame(
  plans: string[],
  Display: typeof DOMDisplay
): Promise<void> {
  const gameState = {
    lives: config.lives,
    level: 0,
  };

  const initialLevel = manageLevelErrors(
    Number(getQueryParam("level")),
    plans.length - 1
  );

  watch.init();
  lives.init(String(config.lives));

  for (gameState.level = initialLevel; gameState.level < plans.length; ) {
    let status = await runLevel(Level.create(plans[gameState.level]), Display);
    if (status == "won") {
      gameState.level++;
    } else if (status == "lost" && gameState.lives > 1) {
      gameState.lives -= 1;
      lives.update(String(gameState.lives));
    } else {
      gameState.lives = config.lives;
      gameState.level = 0;
      lives.update(String(gameState.lives));
      alert("You've lost! Start over! :(");
      watch.reset();
    }
  }
  alert("You've won!");
}

runGame(gameLevels, DOMDisplay);
