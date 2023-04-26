const baseUrl = import.meta.env.VITE_API_BASE_URL;

import flash from "../components/flash";
import { getImageFromVideo } from "../utils";
import p5 from "p5";

let vertices2D = null;

// vertices2d example
// const vertices2D = [
//   { x: 0, y: 0 },
//   { x: 0, y: 100 },
//   { x: 100, y: 100 },
//   { x: 100, y: 0 },
// ];

// P5 sketch
const sketch = (cnv) => {
  cnv.setup = () => {
    cnv.createCanvas(window.innerWidth, window.innerHeight);
    cnv.noStroke();
    cnv.textAlign(cnv.CENTER);
    cnv.clear();
  };

  cnv.draw = () => {
    cnv.beginShape();
    cnv.clear();

    vertices2D?.forEach((vertex) => {
      cnv.vertex(vertex.x, vertex.y);
    });
    cnv.endShape(cnv.CLOSE);
  };

  cnv.windowResized = () =>
    cnv.resizeCanvas(window.innerWidth, window.innerHeight);
};

export function p5OcrExample() {
  const video = document.querySelector("video");
  const button = document.querySelector("#button");
  const close = document.querySelector("#close");

  const P5 = new p5(sketch, document.body);

  const takePhoto = async () => {
    console.log("Photo 📸");

    // Canvas par dessus la vidéo
    P5.canvas.style.position = "fixed";

    button.classList.remove("bg-white");
    button.disabled = true;

    video.pause();

    // Flash animation
    flash();

    const image = getImageFromVideo(video);

    // Debug image
    /*
    const img = document.createElement("img");
    img.src = image;
    img.style.position = "fixed";
    document.body.appendChild(img);
    */

    /// baseUrl + "ocr"
    try {
      const response = await fetch("http://localhost:9000/ocr", {
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

      if (apiResponse.ocr[0]) {
        const mappedVertices = mapVerticesPosition(
          video.videoWidth,
          video.videoHeight,
          canvas.width / 2,
          canvas.height / 2,
          apiResponse.ocr[0].boundingPoly.vertices
        );

        vertices2D = mappedVertices;
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
    vertices2D = [];
    close.classList.add("hidden");
    button.classList.remove("hidden");
    button.disabled = false;
    video.play();
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
