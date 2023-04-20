import "./style.css";
import { camera } from "./camera";
import { appHeight } from "./utils";

import { objectSequence } from "/projects/objectSequence";

// Lancer la caméra
camera();

// Configurer les interactions
objectSequence();

// Fix Ios
window.addEventListener("resize", appHeight);
appHeight();
