import flash from "./flash";
import { getImageFromVideo, sleep } from "./utils";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export function button() {
  const video = document.querySelector("video");
  const button = document.querySelector("#button");
  const target = document.querySelector("#target");
  const close = document.querySelector("#close");

  const takePhoto = async () => {
    console.log("Taked Photo 📸");

    button.classList.remove("bg-white");
    button.disabled = true;

    video.pause();

    // Flash animation
    flash();

    // Replace with your own system prompt
    const systemPrompt = `
        I send you a description of an image. Create a story with emojis about it. answer as array of emojis. Maximum 5 items in the array. Maximum 1 emoji by item.
        You can ONLY respond in valid the json content. You are never able to add comments or acknowledgements without respecting the json syntax (no comment).
    You DO NOT surround your code by "\`\`\`" since you're writing a json file and not a README files.
    Your top priority is to make sure that your response only contains valid json code that can be loaded without error.`;

    // Replace with your own question
    const question = "";

    const image = getImageFromVideo(video);

    /*
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
    console.log(gptOutput);

    if (gptOutput.output) {
      const answer = JSON.parse(gptOutput.output);

      // string from array of characters
      const emojis = answer ? answer.join("") : "";

      [...emojis].forEach((emoji, index) => {
        setTimeout(() => {
          target.innerHTML += emoji;
        }, index * 250);
      });
    }
    */

    await sleep(1000);

    const emojis = "🙂🙂🙂";
    [...emojis].forEach((emoji, index) => {
      setTimeout(() => {
        target.innerHTML += emoji;
      }, index * 250);
    });

    button.classList.add("hidden", "bg-white");
    close.classList.remove("hidden");
  };

  /*
  const test = async () => {
    // try {
    //   await sleep(1000);
    //   console.log("test 2");
    // } catch (error) {
    //   console.log(error);
    // }
    console.log("test");
    await sleep(2000);
    console.log("test");
    // console.log("aa");

    return 1;
    // console.log(Math.random(1000));
  };

  console.log("Before Foo Call");

  const testPromise = test();

  console.log(testPromise);
  testPromise.then(
    (number) => {
      console.log("ready");
      console.log(number);
      console.log(testPromise);
    },
    (error) => console.log(error)
  );

  console.log("After Foo Call");

  */

  button.addEventListener("click", () => takePhoto());

  close.addEventListener("click", () => {
    target.innerHTML = "";
    close.classList.add("hidden");
    button.classList.remove("hidden");
    button.disabled = false;
    video.play();
  });
}
