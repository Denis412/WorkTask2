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

    <button id="webcamButton" @click="startWebcam">Включить камеру</button>

    <h2>Начать видеозвонок</h2>
    <button id="callButton" @click="createCall">
      Создать видеочат (приглашение)
    </button>

    <h2>Присоединитсья к видеочату</h2>
    <input id="callInput" :value="callId" />

    <button id="answerButton" @click="answerCall">Присоединиться</button>

    <h2>Сбросить</h2>
    <button id="hangupButton" @click="hangup">Отключиться</button>
  </div>
</template>

<script setup>
import webRTC from "src/sdk/webRTC";
import { onMounted } from "vue";

const { callId } = defineProps({
  callId: String,
});

onMounted(() => {
  webRTC();
});
</script>
