export default () => {
  let flash = document.createElement("div");
  document.body.appendChild(flash);

  // add id to flash
  flash.setAttribute("id", "flash");

  flash.style.opacity = 1;

  setTimeout(function () {
    flash.style.opacity = 0;
  }, 50);

  setTimeout(function () {
    document.body.removeChild(flash);
  }, 500);
};
