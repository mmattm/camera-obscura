const baseUrl = import.meta.env.VITE_API_BASE_URL;

import flash from "../components/flash";
import { getImageFromVideo } from "../utils";
import p5 from "p5";

let emojis = [];

// P5 sketch
const sketch = (cnv) => {
  cnv.setup = () => {
    cnv.createCanvas(window.innerWidth, window.innerHeight);
    cnv.noStroke();
    cnv.textAlign(cnv.CENTER);
    cnv.clear();
  };

  cnv.draw = () => {
    if (cnv.frameCount % 10 === 0)
      emojis.forEach((emoji) => {
        cnv.textSize(cnv.random(10, 160));
        cnv.push();
        cnv.translate(cnv.random(0, cnv.width), cnv.random(0, cnv.height));
        cnv.rotate(cnv.random(0, 360));
        cnv.text(emoji, 0, 0);
        cnv.pop();
      });
  };

  cnv.mousePressed = () => {
    cnv.clear();
  };

  cnv.windowResized = () =>
    cnv.resizeCanvas(window.innerWidth, window.innerHeight);
};

export function p5Example() {
  const video = document.querySelector("video");
  const button = document.querySelector("#button");
  const close = document.querySelector("#close");
  const P5 = new p5(sketch);

  const takePhoto = async () => {
    console.log("Photo 📸");

    button.classList.remove("bg-white");
    button.disabled = true;

    video.pause();

    // Canvas par dessus la vidéo
    P5.canvas.style.position = "fixed";

    // Flash animation
    flash();

    // Replace with your own system prompt
    const systemPrompt = `
    You are an assistant that create an emoji story from an image description. Output is an array of emojis. Maximum 5 items in the array. Maximum 1 emoji by item.
        You can ONLY respond in valid the json content. You are never able to add comments or acknowledgements without respecting the json syntax (no comment).
    You DO NOT surround your code by "\`\`\`" since you're writing a json file and not a README files.
    Your top priority is to make sure that your response only contains valid json code that can be loaded without error.`;

    // Replace with your own question
    const question = "";

    const image = getImageFromVideo(video);

    // Now fetch the api
    const response = await fetch(baseUrl + "gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: image,
        systemPrompt: systemPrompt,
      }),
    });

    let apiResponse = await response.json();
    console.log(apiResponse);

    if (apiResponse.output) emojis = JSON.parse(apiResponse.output);

    button.classList.add("hidden", "bg-white");
    close.classList.remove("hidden");
  };

  button.addEventListener("click", () => takePhoto());

  close.addEventListener("click", () => {
    emojis = [];

    // Réinitialiser le canvas
    P5.setup();

    // Canvas par dessus la vidéo
    P5.canvas.style.position = "initial";

    close.classList.add("hidden");
    button.classList.remove("hidden");
    button.disabled = false;
    video.play();
  });
}
