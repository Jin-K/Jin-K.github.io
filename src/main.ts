import "./style.scss";

import { MediaPresenter } from "sfmediastream";

import { sleep } from "./sleep";

const socket = (await import("socket.io-client")).io("http://localhost:3000");

main();

async function main() {
  matrix();
  // snitchMic();
  debugger;
  const presenter = new MediaPresenter(
    {
      audio: {
        channelCount: 1,
        echoCancellation: false,
      } /* video:{
        frameRate:15,
        width: 1280,
        height: 720,
        facingMode: (frontCamera ? "user" : "environment")
    } */,
    },
    1000
  );

  presenter.debug = true;

  presenter.onRecordingReady = function (packet) {
    console.log("Recording started!");
    console.log("Header size: " + packet.data.size + "bytes");

    // Every new streamer must receive this header packet
    socket.emit("bufferHeader", packet);
  };

  presenter.onBufferProcess = function (packet) {
    console.log("Buffer sent: " + packet[0].size + "bytes");
    socket.emit("stream", packet);
  };

  debugger;
  presenter.startRecording();
  sleep(2000);
  debugger;
  presenter.stopRecording();
  debugger;
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
