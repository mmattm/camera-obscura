import flash from "../flash";
import { getImageFromVideo, typeWriter } from "../utils";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

let objects = []; // ["apple", "banana"];
const number_of_objects = 2;

export function objectSequence() {
  const video = document.querySelector("video");
  const button = document.querySelector("#button");
  const target = document.querySelector("#target");
  const close = document.querySelector("#close");

  const takePhoto = async () => {
    console.log("Photo 📸");

    button.classList.remove("bg-white");
    button.disabled = true;

    target.innerHTML = "";

    video.pause();

    // Flash animation
    flash();

    const question = "Tell me the main object of the image. Only 1 word";
    const image = getImageFromVideo(video);

    // On récupère la réponse de l'API
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

    // On ajoute l'objet à la liste
    objects.push(apiResponse.prediction.output);

    // Si on a assez d'objets, on lance la requête
    if (objects.length === number_of_objects) {
      const systemPrompt = `
      You are an assistant that have to suggest to make something creative with things. I give you a list of items names separated by a comma and you have to suggest what to do with these things. Suggest only one thing, Write a very short explanation. only few words. add emojis at the end`;

      // const systemPrompt = `
      // You are an assistant that have to combine two items. I give you a list of items separated by a comma and you have to propose an item that combine them. Answer only with the emoji. Nothing else.`;

      // On envoie la liste des objets à l'API GPT
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

      // On masque le bouton
      button.classList.add("hidden", "bg-white");
      await typeWriter(apiResponse.output.replace(/['"]+/g, ""), 50, target);
      //target.innerHTML = apiResponse.output.replace(/['"]+/g, "") || "🤷‍♂️";

      // On vide la liste
      objects = [];

      // On affiche le close
      close.classList.remove("hidden");
    } else {
      // Sinon on relance la caméra
      target.innerHTML = objects.length + "/" + number_of_objects;
      reloadCamera();
    }
  };

  target.innerHTML = objects.length + "/" + number_of_objects;

  function reloadCamera() {
    button.classList.add("bg-white");
    close.classList.add("hidden");
    button.classList.remove("hidden");
    button.disabled = false;
    video.play();
  }

  close.addEventListener("click", () => {
    reloadCamera();
    target.innerHTML = "";
  });

  button.addEventListener("click", () => takePhoto());
}
