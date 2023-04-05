export function Camera() {
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

  let video = document.createElement("video");
  video.style.width = document.width + "px";
  video.style.height = document.height + "px";
  video.setAttribute("autoplay", "");
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");

  var facingMode = "user";

  var constraints = {
    audio: false,
    video: {
      facingMode: facingMode,
    },
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function success(stream) {
      video.srcObject = stream;
    });

  document.body.appendChild(video);

  video.addEventListener("click", function () {
    if (facingMode == "user") {
      facingMode = "environment";
    } else {
      facingMode = "user";
    }

    constraints = {
      audio: false,
      video: {
        facingMode: facingMode,
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function success(stream) {
        video.srcObject = stream;
      });
  });
}
