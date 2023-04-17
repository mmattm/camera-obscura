import flash from "./flash";
import { getImageFromVideo, sleep } from "./utils";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

let objects = [];
//let objects = ["apple", "banana"];

export function objectGuesser() {
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

    // Replace with your own question.
    const question = "Tell me the main object of the image. Only 1 word";

    const image = getImageFromVideo(video);

    // Now fetch the api
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: image, // Optionnel. Si non fourni, l'API va intéroger GPT avec le prompt texte uniquement
        visualQuestion: question, // Optionnel. Si non fourni, l'API intéroge GPT à partir de la description automatique de l'image
      }),
    });

    let apiResponse = await response.json();
    console.log(apiResponse);

    objects.push(apiResponse.prediction.output);
    console.log(objects);

    if (objects.length === 2) {
      // Replace with your own system prompt
      // const systemPrompt = `
      // You are an assistant that have to guess an object. I give you a list of object names separated by a comma and you have to guess the next one. Answer with a single character. No words description. do not put other text. Only the emoji character.`;

      const systemPrompt = `
      You are an assistant that have to combine two items. I give you a list of items separated by a comma and you have to propose an item that combine them. Answer with a single character. No words description. give the answer as an emoji. do not put other text. Only the emoji character.`;

      // Now fetch the api
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemPrompt: systemPrompt,
          content: objects.join(", "),
        }),
      });

      let apiResponse = await response.json();
      console.log(apiResponse);
      target.innerHTML = apiResponse.output.replace(/['"]+/g, "") || "🤷‍♂️";
      objects = [];
    } else {
      target.innerHTML = objects.length + "/2";
    }

    button.classList.add("bg-white");
    close.classList.add("hidden");
    button.classList.remove("hidden");
    button.disabled = false;
    video.play();
  };

  button.addEventListener("click", () => takePhoto());
}
