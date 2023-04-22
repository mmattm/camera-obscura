const baseUrl = import.meta.env.VITE_API_BASE_URL;

import flash from "../flash";
import { sleep } from "../utils";

export function emptyExample() {
  const video = document.querySelector("video");
  const button = document.querySelector("#button");
  const close = document.querySelector("#close");

  const takePhoto = async () => {
    console.log("Photo 📸");

    button.classList.remove("bg-white");
    button.disabled = true;

    video.pause();

    // Flash animation
    flash();

    // Fake loading
    await sleep(1000);

    button.classList.add("hidden", "bg-white");
    close.classList.remove("hidden");
  };

  button.addEventListener("click", () => takePhoto());

  close.addEventListener("click", () => {
    close.classList.add("hidden");
    button.classList.remove("hidden");
    button.disabled = false;
    video.play();
  });
}
