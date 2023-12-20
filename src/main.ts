import "./style.css";
import { Level } from "./models/Level";
import { State } from "./models/State";
import simpleLevelPlan from "./simplePlan";
import DOMDisplay from "./DOMDisplay";

let simpleLevel = Level.create(simpleLevelPlan);
let display = new DOMDisplay(document.body, simpleLevel);
display.syncState(State.start(simpleLevel));
