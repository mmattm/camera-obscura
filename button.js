import { getImageFromVideo } from "./utils";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export function setupButton(button, target, flash) {
  let answer = null;

  const takePhoto = async () => {
    console.log("Taked Photo 📸");
    button.classList.remove("bg-white", "outline");
    button.firstElementChild.classList.remove("hidden");
    button.disabled = true;

    // Flash animation
    flash.classList.add("bg-white");
    await sleep(100);
    flash.classList.remove("bg-white");

    await sleep(1000);

    // Replace with your own system prompt
    //const systemPrompt = `
    // You are a hypochondriac person. I send you a description of a situation. Say //something about this in only few words with absurd tone. Output as json`;

    const systemPrompt = `
        I send you a description of an image. list every objets as emoji representation. answer as array of emojis. Maximum 5 emojis.
        You can ONLY respond in valid the json content. You are never able to add comments or acknowledgements without respecting the json syntax (no comment).
    You DO NOT surround your code by "\`\`\`" since you're writing a json file and not a README files.
    Your top priority is to make sure that your response only contains valid json code that can be loaded without error.`;

    // Replace with your own question
    const question = "";

    // get image from video
    // const video = document.querySelector("video");
    // const canvas = document.createElement("canvas");
    // canvas.width = video.videoWidth;
    // canvas.height = video.videoHeight;
    // const ctx = canvas.getContext("2d");
    // ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // const image = canvas.toDataURL("image/jpeg");
    const image = getImageFromVideo(document.querySelector("video"));

    // Now fetch the api
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
        image: image,
        systemPrompt: systemPrompt,
      }),
    });

    let gptOutput = await response.json();

    if (response.status !== 201) {
      console.log("error");
      return;
    }

    console.log(gptOutput);
    answer = JSON.parse(gptOutput.output);

    // string from array of characters
    const emojis = answer.join("");

    target.innerHTML = emojis;

    button.classList.add("bg-white", "outline");
    button.firstElementChild.classList.add("hidden");
    button.disabled = false;
    //console.log(output.objects);
  };

  const test = async () => {
    //await sleep(500);
    console.log(Math.random(1000));
  };

  console.log("Before Foo Call");
  test();
  console.log("After Foo Call");
  //document.addEventListener("click", () => test());

  button.addEventListener("click", () => takePhoto());
}

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
