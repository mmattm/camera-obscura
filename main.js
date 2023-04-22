import "./style.css";
import { camera } from "./camera";
import { appHeight } from "./utils";

import { objectSequence } from "./examples/objectSequence";

// Lancer la caméra
camera();

// Projet
objectSequence();

// Fix Ios
window.addEventListener("resize", appHeight);
appHeight();
