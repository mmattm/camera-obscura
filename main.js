import "./style.css";
import { camera } from "./camera";
import { button } from "./button";
import { appHeight } from "./utils";

// Query all objects
// const button = document.querySelector("#button");
// const target = document.querySelector("#target");
// const flash = document.querySelector("#flash");

// Lancer la caméra
camera();

// Configurer les interactions
button();

// Fix Ios
window.addEventListener("resize", appHeight);
appHeight();
