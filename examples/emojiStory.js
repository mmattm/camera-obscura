const baseUrl = import.meta.env.VITE_API_BASE_URL;

import flash from "../components/flash";
import { getImageFromVideo } from "../utils";

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
    const response = await fetch(baseUrl + "gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      /*
      body arguments:
      - image: base64 string de l'image
      - visualQuestion: question posée sur le contenu de l'image. Si vide, description automatique de l'image
      - systemPrompt: prompt texte envoyé à GPT (role: system)
      - content: body envoyé à GPT, doit être fourni si pas d'image (role: user)
      https://platform.openai.com/docs/guides/chat/introduction
      */
      body: JSON.stringify({
        image: image,
        systemPrompt: systemPrompt,
      }),
    });

    let apiResponse = await response.json();
    console.log(apiResponse);

    if (apiResponse.output) {
      const answer = JSON.parse(apiResponse.output);

      // On assombrit la vidéo
      video.style.filter = "brightness(70%)";

      // ON affiche les emojis
      answer.forEach((emoji, index) => {
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
    video.style.filter = "brightness(100%)";
    close.classList.add("hidden");
    button.classList.remove("hidden");
    button.disabled = false;
    video.play();
  });
}
