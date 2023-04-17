import flash from "./flash";
import { getImageFromVideo, sleep } from "./utils";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export function emptyExample() {
  const video = document.querySelector("video");
  const button = document.querySelector("#button");
  const target = document.querySelector("#target");
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
    target.innerHTML = "";
    close.classList.add("hidden");
    button.classList.remove("hidden");
    button.disabled = false;
    video.play();
  });
}
