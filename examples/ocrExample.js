const baseUrl = import.meta.env.VITE_API_BASE_URL;

import flash from "../components/flash";
import { getImageFromVideo, typeWriter } from "../utils";

export function ocrExample() {
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

    const image = getImageFromVideo(video);

    /// baseUrl + "ocr"
    try {
      const response = await fetch(baseUrl + "ocr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          image: image,
        }),
      });

      let apiResponse = await response.json();
      console.log(apiResponse);

      const canvas = document.querySelector("canvas");

      // window width
      if (apiResponse.ocr) {
        const mappedVertices = mapVerticesPosition(
          video.videoWidth,
          video.videoHeight,
          window.innerWidth,
          window.innerHeight,
          apiResponse.ocr.boundingPoly.vertices
        );

        await createDivFromVertices(
          mappedVertices,
          apiResponse.ocr.description
        );
      }

      button.classList.add("hidden", "bg-white");
      close.classList.remove("hidden");
    } catch (error) {
      // TypeError: Failed to fetch
      console.log("There was an error", error);
    }
  };

  button.addEventListener("click", () => takePhoto());

  close.addEventListener("click", () => {
    close.classList.add("hidden");
    button.classList.remove("hidden");
    button.disabled = false;
    video.play();

    // remove all divs with ocr class
    const ocrDivs = document.querySelectorAll(".ocr");
    ocrDivs.forEach((div) => div.remove());
  });
}

function mapVerticesPosition(
  smallerWidth,
  smallerHeight,
  biggerWidth,
  biggerHeight,
  vertices2D
) {
  const widthScalingFactor = biggerWidth / smallerWidth;
  const heightScalingFactor = biggerHeight / smallerHeight;

  const mappedVertices = vertices2D.map((vertex) => {
    return {
      x: vertex.x * widthScalingFactor,
      y: vertex.y * heightScalingFactor,
    };
  });

  return mappedVertices;
}

async function createDivFromVertices(vertices2D, text) {
  // Calculate the bounding box of the shape
  const boundingBox = vertices2D.reduce(
    (acc, vertex) => {
      acc.minX = Math.min(acc.minX, vertex.x);
      acc.minY = Math.min(acc.minY, vertex.y);
      acc.maxX = Math.max(acc.maxX, vertex.x);
      acc.maxY = Math.max(acc.maxY, vertex.y);
      return acc;
    },
    { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
  );

  // Calculate the position and size
  const left = boundingBox.minX;
  const top = boundingBox.minY;
  const width = boundingBox.maxX - boundingBox.minX;
  const height = boundingBox.maxY - boundingBox.minY;

  // Create the div
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.left = `${left}px`;
  div.style.top = `${top}px`;
  div.style.width = `${width}px`;
  div.style.height = `${height}px`;
  div.classList.add("ocr");

  div.classList.add("text-5xl", "text-center", "text-black", "bg-white");

  // Append the div to the body or another container
  document.body.appendChild(div);

  await typeWriter(text, 100, div);
}
