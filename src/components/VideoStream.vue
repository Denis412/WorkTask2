<template>
  <div class="flex items-center text-center justify-center column">
    <div class="videos">
      <span>
        <h3>Ваша камера</h3>
        <video id="webcamVideo" autoplay playsinline></video>
      </span>

      <span>
        <h3>Камера собеседника</h3>
        <video id="remoteVideo" autoplay playsinline></video>
      </span>
    </div>

    <button id="webcamButton">Включить камеру</button>

    <h2>Начать видеозвонок</h2>
    <button id="callButton" disabled>Создать видеочат (приглашение)</button>

    <h2>Присоединитсья к видеочату</h2>
    <input id="callInput" />

    <button id="answerButton" disabled>Присоединиться</button>

    <h2>Сбросить</h2>
    <button id="hangupButton" disabled>Отключиться</button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import webRTC from "src/sdk/webRTC";

onMounted(() => {
  webRTC();
});
</script>
