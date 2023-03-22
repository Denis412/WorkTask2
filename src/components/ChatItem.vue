<template>
  <q-item clickable class="flex items-center" @click="selectChat(currentChat)">
    <div>{{ currentChat.consumer_firstName }}</div>
    <div class="q-ml-md text-grey">
      <span
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

const { currentChat } = defineProps({
  currentChat: Object,
});

const selectChat = inject("selectChat");
</script>
