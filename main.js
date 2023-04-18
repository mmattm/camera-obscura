import "./style.css";
import { camera } from "./camera";
import { appHeight } from "./utils";

import { objectGuesser } from "./objectGuesser";

// Lancer la caméra
camera();

// Configurer les interactions
objectGuesser();

// Fix Ios
window.addEventListener("resize", appHeight);
appHeight();
