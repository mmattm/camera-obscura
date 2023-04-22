import "./style.css";
import { camera } from "./camera";
import { appHeight } from "./utils";

import { objectSequence } from "./examples/objectSequence";
import p5Example from "./examples/p5Example";

// Lancer la caméra
camera();

// Projet
p5Example();

// Fix Ios
window.addEventListener("resize", appHeight);
appHeight();
