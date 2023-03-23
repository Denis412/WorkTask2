<template>
  <q-item clickable class="flex items-center" @click="selectChat(currentChat)">
    <!-- {{ currentChat }} -->
    <q-img class="avatar-min-size" :src="currentChat.sender_avatar" />
    <div class="q-ml-md">{{ currentChat.consumer_firstName }}</div>
    <div class="q-ml-md text-grey">
      <span v-if="lastMessage"
        >{{ lastMessage?.senderDisplayName }}: {{ lastMessage?.content }}</span
      >
    </div>
  </q-item>
</template>

<script setup>
import { useSubscription } from "@vue/apollo-composable";
import { computed, inject } from "vue";
import { getLastMessageInTheChat } from "../graphql-operations/subscriptions";

const { result: lastMessages } = useSubscription(getLastMessageInTheChat, {
  chat_id: currentChat.id,
});

const lastMessage = computed(() => lastMessages.value?.chats[0]?.messages[0]);
const user = computed(() => window.Clerk?.user);

const { currentChat } = defineProps({
  currentChat: Object,
});

const selectChat = inject("selectChat");
</script>
