import "./style.scss";

import { sleep } from "./sleep";

main();

function main() {
  matrix();
  // snitchMic();
}

async function matrix() {
  const textArea = document.querySelector<HTMLTextAreaElement>("#myTextArea")!;

  await sleep(1000);
  textArea.value = "Hello jeune padawan, \r\n";
  await sleep(1500);
  textArea.value += "Bienvenue dans ma matrice.\r\n";

  // game loop
  while (true) {
    await sleep(1000);
    textArea.value += ".";
  }
}

async function snitchMic() {
  const socket = (await import("socket.io-client")).io("http://localhost:3000");
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });

  const mediaRecorder = new MediaRecorder(mediaStream);

  mediaRecorder.ondataavailable = function (blobEvent) {
    console.log("mediaRecorder.ondataavailable");
    var blob = new Blob([blobEvent.data], { type: "audio/ogg; codecs=opus" });
    socket.emit("radio", blob);
  };
  // mediaRecorder.onstop = function () {};

  // Start recording with 100ms time slice duration
  mediaRecorder.start(20);

  // Stop recording after 2.5 seconds and broadcast it to server
  await sleep(2500);
  mediaRecorder.stop();
}
