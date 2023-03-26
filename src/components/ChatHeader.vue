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
        @click="setCallId"
      />
    </div>

    <q-icon
      class="q-mx-md text-h5 text-primary cur-pointer"
      name="arrow_back"
    />
  </header>
</template>

<script setup>
import { inject } from "vue";
import { useStore } from "vuex";

const store = useStore();

const { title, avatarUrl, selectedChat } = defineProps({
  title: String,
  avatarUrl: String,
  selectedChat: Object,
});

const toggleShowVideoTrack = inject("toggleShowVideoTrack");

const setCallId = async () => {
  toggleShowVideoTrack();

  if (selectedChat.call_id) return;
};
</script>
