<template>
  <header
    class="flex items-center justify-between bg-grey-4"
    style="min-height: 4rem"
  >
    <div class="flex items-center">
      <div>
        <q-img class="q-ml-md avatar-min-size" :src="avatarUrl" />
      </div>
      <!-- call: {{ callId }} -->

      <span class="q-ml-md text-h5">{{ title }}</span>

      <q-icon
        class="q-mx-md text-h5 text-primary cur-pointer"
        name="videocam"
        @click="setCallId"
      />

      <!-- call: {{ selectedChat?.call_id }} sel: {{ selectedChat }} -->
    </div>

    <q-icon
      class="q-mx-md text-h5 text-primary cur-pointer"
      name="arrow_back"
    />
  </header>
</template>

<script setup>
import { computed, inject } from "vue";
import { useStore } from "vuex";
import { useMutation } from "@vue/apollo-composable";
import { createCallInChat } from "src/graphql-operations/mutations";
//import webRTCApi from "../sdk/RTC";

const store = useStore();

const { title, avatarUrl, selectedChat } = defineProps({
  title: String,
  avatarUrl: String,
  selectedChat: Object,
});

const setTrueForShowVideoTrack = inject("setTrueForShowVideoTrack");
const currentUser = computed(() => store.getters["chat/GET_CURRENT_USER"]);

const { mutate: creatingCall } = useMutation(createCallInChat);

const setCallId = async () => {
  setTrueForShowVideoTrack();

  //console.log(selectedChat.call_id);
  if (selectedChat.call_id) return;

  let sender,
    consumer = "";

  if (currentUser.value.id === selectedChat.sender_id) {
    sender = selectedChat.sender_id;
    consumer = selectedChat.consumer_id;
  } else {
    sender = selectedChat.consumer_id;
    consumer = selectedChat.sender_id;
  }
};
</script>
