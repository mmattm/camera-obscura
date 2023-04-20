import "./style.css";
import { camera } from "./camera";
import { appHeight } from "./utils";

import { objectSequence } from "/projects/objectSequence";
import { emojiStory } from "/projects/emojiStory";

// Lancer la caméra
camera();

// Configurer les interactions
objectSequence();
//emojiStory();

// Fix Ios
window.addEventListener("resize", appHeight);
appHeight();
