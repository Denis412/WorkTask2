<template>
  <q-card-section class="flex row justify-center row">
    <div class="q-pa-sm">
      <video class="rounded-borders" id="localVideo" autoplay></video>
    </div>
    <div class="q-pa-sm">
      <video class="rounded-borders" id="remoteVideo" autoplay></video>
    </div>
  </q-card-section>
</template>

<script setup>
import { onMounted } from "vue";
import webRTC from "src/sdk/webRTC";

onMounted(() => {
  webRTC();
});
</script>

<style>
.videos_container {
  display: flex;
  flex-direction: row !important;
}
</style>
