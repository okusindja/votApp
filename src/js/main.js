let startButton = document.querySelector(".start");
let mainContent = document.querySelector(".main");
let qrcodeContent = document.querySelector(".qrcode");
let facescanContent = document.querySelector(".facescan.background--hidden");
let dataConfirmationContent = document.querySelector(
  ".data-confirmation.background--hidden"
);
let dataConfirmationButton = document.querySelector(
  ".data-confirmation .confirm-button"
);
let dataConfirmationEndContent = document.querySelector(
  ".data-confirmation__end.background--hidden"
);
let dataConfirmationEndButton = document.querySelector(
  ".data-confirmation__end .confirm-button"
);

startButton.addEventListener("click", () => {
  mainContent.style.display = "none";
  qrcodeContent.style.display = "flex";

  setTimeout(() => {
    qrcodeContent.style.display = "none";
    dataConfirmationContent.style.display = "flex";
  }, 4000);
});

dataConfirmationButton.addEventListener("click", () => {
  dataConfirmationContent.style.display = "none";
  mainContent.style.display = "none";
  qrcodeContent.style.display = "none";
  dataConfirmationEndContent.style.display = "flex";
});

dataConfirmationEndButton.addEventListener("click", () => {
  facescanContent.style.display = "flex";
  dataConfirmationEndContent.style.display = "none";
});
