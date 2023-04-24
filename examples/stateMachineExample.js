const baseUrl = import.meta.env.VITE_API_BASE_URL;

import flash from "../components/flash";
import { sleep } from "../utils";

const machine = {
  state: "IDLE",
  transitions: {
    IDLE: {
      press() {
        console.log("Photo 📸");
        this.state = "LOADING";
      },
    },
    LOADING: {
      complete() {
        this.state = "COMPLETE";
      },
    },
    COMPLETE: {
      reset() {
        this.state = "IDLE";
      },
    },
  },
  dispatch(actionName) {
    const action = this.transitions[this.state][actionName];

    if (action) {
      action.call(this);
    } else {
      console.log("invalid action");
    }

    console.log(this.state);
  },
};

export function stateMachineExample() {
  const video = document.querySelector("video");
  const button = document.querySelector("#button");
  const close = document.querySelector("#close");

  const camera = Object.create(machine);

  const takePhoto = async () => {
    camera.dispatch("press");
    button.classList.remove("bg-white");
    button.disabled = true;

    video.pause();

    // Flash animation
    flash();

    // Fake loading
    await sleep(1000);

    camera.dispatch("complete");

    button.classList.add("hidden", "bg-white");
    close.classList.remove("hidden");
  };

  button.addEventListener("click", () => takePhoto());

  close.addEventListener("click", () => {
    close.classList.add("hidden");
    button.classList.remove("hidden");
    button.disabled = false;
    video.play();
    camera.dispatch("reset");
  });
}
