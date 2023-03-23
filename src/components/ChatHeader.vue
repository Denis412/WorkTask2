<template>
  <header
    class="flex items-center justify-between bg-grey-4"
    style="min-height: 4rem"
  >
    <div class="flex items-center">
      <div>
        <q-img class="q-ml-md avatar-min-size" :src="avatarUrl" />
      </div>
      <span class="q-ml-md text-h5">{{ title }}</span>
      <q-icon
        class="q-mx-md text-h5 text-primary cur-pointer"
        name="videocam"
        @click="show = !show"
      />
      <!-- <VueWebRTC ref="webrtc" width="100%" roomId="sample-room"> </VueWebRTC> -->
    </div>
    <q-icon
      class="q-mx-md text-h5 text-primary cur-pointer"
      name="arrow_back"
    />
  </header>
</template>

<script setup>
import { ref } from "vue";
const { title, avatarUrl } = defineProps({
  title: String,
  avatarUrl: String,
});

const webrtc = ref(null);
const show = ref(false);
</script>
