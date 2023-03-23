<template>
  <q-item clickable class="flex items-center" @click="selectChat(currentChat)">
    <!-- {{ currentChat }} -->
    <q-img class="avatar-min-size" :src="calculateAvatar()" />
    <div class="q-ml-md">{{ calculateUserName() }}</div>
    <div class="q-ml-md text-grey">
      <span v-if="lastMessage"
        >{{ lastMessage?.senderDisplayName }}: {{ lastMessage?.content }}</span
      >
    </div>
  </q-item>
</template>

<script setup>
import { useSubscription } from "@vue/apollo-composable";
import { computed, inject, watch } from "vue";
import { getLastMessageInTheChat } from "../graphql-operations/subscriptions";

const { currentChat } = defineProps({
  currentChat: Object,
});

const user = inject("user");
const selectChat = inject("selectChat");

const { result: lastMessages } = useSubscription(getLastMessageInTheChat, {
  chat_id: currentChat.id,
});

const lastMessage = computed(() => lastMessages.value?.chats[0]?.messages[0]);

const calculateAvatar = () => {
  return currentChat.sender_id === user.id
    ? currentChat.consumer_avatar
    : currentChat.sender_avatar;
};
const calculateUserName = () => {
  return currentChat.sender_id === user.id
    ? currentChat.consumer_firstName
    : currentChat.sender_firstName;
};

watch(user, (value) => {
  console.log("hi");
});
</script>
