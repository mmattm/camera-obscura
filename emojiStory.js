import flash from "./flash";
import { getImageFromVideo, sleep } from "./utils";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export function emojiStory() {
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
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: image, // Optionnel. Si non fourni, l'API va intéroger GPT avec le prompt texte uniquement
        visualQuestion: question, // Optionnel. Si non fourni, l'API intéroge GPT à partir de la description automatique de l'image
        systemPrompt: systemPrompt, // Optionnel. Si non fourni, l'API génère retourne uniquement l'analyse de l'image
        // content: "", // Doit être fourni si pas d'image
      }),
    });

    let apiResponse = await response.json();
    console.log(apiResponse);

    if (apiResponse.output) {
      const answer = JSON.parse(apiResponse.output);

      // string from array of characters
      const emojis = answer ? answer.join("") : "";

      [...emojis].forEach((emoji, index) => {
        setTimeout(() => {
          target.innerHTML += emoji;
        }, index * 250);
      });
    }

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
