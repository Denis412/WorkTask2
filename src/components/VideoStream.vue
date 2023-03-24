<template>
  <!-- <q-card-section class="flex row justify-center row">
    <div class="q-pa-sm">
      <video class="rounded-borders" id="localVideo" autoplay></video>
    </div>

    <div class="q-pa-sm">
      <video class="rounded-borders" id="remoteVideo" autoplay></video>
    </div>
  </q-card-section> -->

  <div style="width: 100vw; height: 100vh">
    <h2>1. Start your Webcam</h2>
    <div class="videos">
      <span>
        <h3>Local Stream</h3>
        <video id="webcamVideo" autoplay playsinline></video>
      </span>
      <span>
        <h3>Remote Stream</h3>
        <video id="remoteVideo" autoplay playsinline></video>
      </span>
    </div>

    <button id="webcamButton">Start webcam</button>
    <h2>2. Create a new Call</h2>
    <button id="callButton" disabled>Create Call (offer)</button>

    <h2>3. Join a Call</h2>
    <p>Answer the call from a different browser window or device</p>

    <input id="callInput" />
    <button id="answerButton" disabled>Answer</button>

    <h2>4. Hangup</h2>

    <button id="hangupButton" disabled>Hangup</button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import webRTC from "src/sdk/webRTC";

onMounted(() => {
  webRTC();
});
</script>
