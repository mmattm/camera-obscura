export const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};

export const getImageFromVideo = (videoPlayer) => {
  const canvas = document.createElement("canvas");
  canvas.width = videoPlayer.videoWidth;
  canvas.height = videoPlayer.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg");
};

export const typeWriter = (txt, speed, target) => {
  let i = 0;
  target.innerHTML = "";

  const loopInText = () => {
    if (i < txt.length) {
      target.innerHTML += txt.charAt(i);
      i++;
      setTimeout(loopInText, speed);
    }
  };

  loopInText();
};

export const sleep = (ms) => new Promise((res, rej) => setTimeout(res, ms));
