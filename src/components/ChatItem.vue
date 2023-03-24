<template>
  <q-item
    clickable
    class="flex items-center flex-wrap"
    @click="selectChat(currentChat)"
  >
    <div class="flex items-center">
      <div class="flex justify-center">
        <q-img class="avatar-min-size" :src="calculateAvatar()" />
      </div>

      <div class="q-ml-sm text-center">{{ calculateUserName() }}</div>
    </div>

    <div
      v-if="lastMessage"
      class="q-ml-md text-grey"
      style="max-width: max-content; overflow-x: auto"
    >
      {{ lastMessage?.senderDisplayName }}: {{ lastMessage?.content }},
      {{ calculateTime(lastMessage?.created_at) }}
    </div>
  </q-item>
</template>

<script setup>
import { useSubscription } from "@vue/apollo-composable";
import { computed, inject, watch } from "vue";
import { getLastMessageInTheChat } from "../graphql-operations/subscriptions";
import { calculateTime } from "src/utils/calculateTime";

const { currentChat } = defineProps({
  currentChat: Object,
});

const user = computed(() => inject("user"));
const selectChat = inject("selectChat");

const { result: lastMessages } = useSubscription(getLastMessageInTheChat, {
  chat_id: currentChat.id,
});

const lastMessage = computed(() => lastMessages.value?.chats[0]?.messages[0]);

const calculateAvatar = () => {
  return currentChat.sender_id === user.value.value?.id
    ? currentChat.consumer_avatar
    : currentChat.sender_avatar;
};
const calculateUserName = () => {
  return currentChat.sender_id === user.value.value?.id
    ? currentChat.consumer_firstName
    : currentChat.sender_firstName;
};

watch(user, (value) => {
  console.log("hi");
});
</script>
