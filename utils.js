export const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
// window.addEventListener("resize", appHeight);
// appHeight();

export const getImageFromVideo = (videoPlayer) => {
  const canvas = document.createElement("canvas");
  canvas.width = videoPlayer.videoWidth;
  canvas.height = videoPlayer.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg");
};
