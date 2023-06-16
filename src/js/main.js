import { getData } from "./services/fetchData.js";
import { getPresidents } from "./services/fetchPresidents.js";

let startButton = document.querySelector(".start");
let mainContent = document.querySelector(".main");
let qrcodeContent = document.querySelector(".qrcode");
let facescanContent = document.querySelector(".facescan.background--hidden");
let dataConfirmationContent = document.querySelector(
  ".data-confirmation.background--hidden"
);
let dataConfirmationContentName = document.querySelector(
  ".data-confirmation.background--hidden .name"
);
let dataConfirmationContentBI = document.querySelector(
  ".data-confirmation.background--hidden .id"
);
let dataConfirmationContentAddress = document.querySelector(
  ".data-confirmation.background--hidden .address"
);
let dataConfirmationButton = document.querySelector(
  ".data-confirmation .button--confirm-button"
);
let dataConfirmationEndContent = document.querySelector(
  ".data-confirmation__end.background--hidden"
);
let dataConfirmationEndButton = document.querySelector(
  ".data-confirmation__end .confirm-button"
);
let facescanNextButton = document.querySelector(
  ".data-confirmation__end .confirm-button"
);
let confirmationDone = document.querySelector(
  ".data-confirmation__end--to-vote"
);

let confirmationDoneButton = document.querySelector(
  ".data-confirmation__end--to-vote .button--confirm-button"
);

let president = document.querySelector(".choices__presidents");

let choicesContent = document.querySelector(".choices");

startButton.addEventListener("click", () => {
  mainContent.style.display = "none";
  qrcodeContent.style.display = "flex";

  let scanner = new Instascan.Scanner({
    video: document.getElementById("preview"),
  });

  scanner.addListener("scan", function (content) {
    getData(content).then((voter) => {
      if (voter) {
        scanner.stop();
        // qrcodeContent.style.display = "none";
        dataConfirmationContentName.innerHTML = `Nome ${voter.name}`;
        dataConfirmationContentBI.innerHTML = `BI: ${voter.bi}`;
        dataConfirmationContentAddress.innerHTML = `Address: ${voter.address}`;
        dataConfirmationContent.style.display = "flex";
      }
    });
  });
  Instascan.Camera.getCameras()
    .then(function (cameras) {
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
      } else {
        console.error("Seu dispositivo não possui câmera!");
      }
    })
    .catch(function (e) {
      console.error(e);
    });
});
dataConfirmationButton.addEventListener("click", () => {
  // dataConfirmationContent.style.display = "none";
  dataConfirmationEndContent.style.display = "flex";
});

dataConfirmationEndButton.addEventListener("click", () => {
  facescanContent.style.display = "flex";
  // dataConfirmationEndContent.style.display = "none";
});

facescanNextButton.addEventListener("click", () => {
  const cam = document.querySelector("#video");

  Promise.all([
    // Retorna apenas uma promisse quando todas já estiverem resolvidas

    faceapi.nets.tinyFaceDetector.loadFromUri("./js/libs/facescan/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./js/libs/facescan/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("./js/libs/facescan/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("./js/libs/facescan/models"),
  ]).then(startVideo);

  async function startVideo() {
    const constraints = { video: true };

    try {
      let stream = await navigator.mediaDevices.getUserMedia(constraints);

      cam.srcObject = stream;
      cam.onloadedmetadata = (e) => {
        cam.play();
      };
    } catch (err) {
      console.error(err);
    }
  }
  setTimeout(() => {
    cam.addEventListener("play", () => {
      const canvas = faceapi.createCanvasFromMedia(video); // Criando canvas para mostrar nossos resultador
      document.body.append(canvas); // Adicionando canvas ao body

      const displaySize = { width: cam.width, height: cam.height }; // criando tamanho do display a partir das dimenssões da nossa cam

      faceapi.matchDimensions(canvas, displaySize); // Igualando as dimensões do canvas com da nossa cam

      setInterval(async () => {
        // Intervalo para detectar os rostos a cada 100ms
        const detections = await faceapi
          .detectAllFaces(
            cam, // Primeiro parametro é nossa camera
            new faceapi.TinyFaceDetectorOptions() // Qual tipo de biblioteca vamos usar para detectar os rostos
          )
          .withFaceLandmarks() // Vai desenhar os pontos de marcação no rosto
          .withFaceExpressions(); // Vai determinar nossas expressões

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        ); // Redimensionado as detecções

        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height); // Apagando nosso canvas antes de desenhar outro

        faceapi.draw.drawDetections(canvas, resizedDetections); // Desenhando decções
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections); // Desenhando os pontos de referencia
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections); // Desenhando expressões
      }, 100);
    });
    cam.remove();
    // facescanContent.style.display = "none";
    confirmationDone.style.display = "flex";
  }, 9000);
});

confirmationDoneButton.addEventListener("click", () => {
  // confirmationDone.style.display = "none";
  document.querySelector(".confirmation-body__informations .choices__container .confirmation-body").style.background = "transparent";
  choicesContent.style.display = "flex";
});

getPresidents().then((entity) => {
  const html = entity
    .map((el) => {
      return `
  <div class="president">
    <div class="president__number">${el.id}</div>
    <div class="president__photo">
      <img src="${el.photo}" alt="photo">
    </div>
    <div class="president__informations">
      <h3 class="president__name">${el.name}</h3>
      <div class="president__informations__party">
        <div class="party__flag">
          <img src="${el.flag}" alt="flag">
        </div>
        <p>${el.party}</p>
      </div>
    </div>
    </div>
`;
    })
    .join("");
  president.innerHTML = html;

  const items = document.querySelectorAll(".president");

  items.forEach((item) => {
    item.addEventListener("click", function () {
      items.forEach((i) => {
        i.style.display = "none";
        // president.style.justifyContent = "unset";
        document.querySelector(".confirmation-body__informations .choices__container .confirmation-body").style.background = "#b6def633";
        document.querySelector(".confirmation-body__informations .greetings").innerHTML = "Confirmar Voto";
        document.querySelector(".choices__container .confirmation-body .choices__presidents").style.width = "fit-content";
      });
      this.style.display = "flex";
      // this.style.flex = "unset";
      president.style.justifyContent = "center";
      document.querySelector(".last").style.display = "block";
      president.style.justifyContent = "center";
      // setTimeout(() => {
        // location.reload();
      // }, 5000);
    });
  });
});
