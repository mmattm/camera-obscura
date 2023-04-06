import "./style.css";
import { camera } from "./camera";
import { setupButton } from "./button";
import { utils } from "./utils";

// Query all objects
const button = document.querySelector("#button");
const target = document.querySelector("#target");
const flash = document.querySelector("#flash");

utils();
camera();

setupButton(button, target, flash);
