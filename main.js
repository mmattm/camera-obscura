import "./style.css";
import { camera } from "./components/camera";
import { appHeight, sleep } from "./utils";

import { objectSequence } from "./examples/objectSequence";
import { stateMachineExample } from "./examples/stateMachineExample";

// Lancer la caméra
camera();

// Projet
stateMachineExample();

// Fix Ios
window.addEventListener("resize", appHeight);
appHeight();
