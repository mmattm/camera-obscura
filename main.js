import "./style.css";
import { camera } from "./camera";
import { appHeight } from "./utils";

import { objectSequence } from "/examples/objectSequence";
import { emojiStory } from "/examples/emojiStory";

// Lancer la caméra
camera();

// Configurer les interactions
objectSequence();
//emojiStory();

// Fix Ios
window.addEventListener("resize", appHeight);
appHeight();
