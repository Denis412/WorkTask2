<template>
  <div class="flex column relative">
    <div v-if="!selectedChat" class="flex justify-center items-center">
      <span class="text-h3">Выберите чат...</span>
    </div>

    <div v-else>
      <ChatHeader :title="calculatedFirstName" :avatarUrl="calculatedAvatar" />

      <div v-if="loading">Загрузка</div>
      <MessagesList v-else :messages="currentMessages?.messages" />

      <SendForm :selectedChat="selectedChat" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import MessagesList from "./MessagesList.vue";
import { useSubscription } from "@vue/apollo-composable";
import SendForm from "../components/SendForm.vue";
import { useStore } from "vuex";
import { getSavedMessagesInThisChat } from "../graphql-operations/subscriptions";
import ChatHeader from "./ChatHeader.vue";

const store = useStore();

const calculatedAvatar = ref("");
const calculatedFirstName = ref("");

const selectedChat = computed(() => store.getters["chat/GET_CURRENT_CHAT"]);
const messages = ref([]);

const variables = ref({ chat_id: selectedChat?.value.id });

const { result: currentMessages, loading } = useSubscription(
  getSavedMessagesInThisChat,
  variables
);

watch(loading, (value) => {
  if (!value) messages.value = currentMessages.value?.messages || [];
});

watch(selectedChat, async (value) => {
  const user = window.Clerk.user;

  variables.value.chat_id = value?.id;

  if (user.id === selectedChat.value.sender_id) {
    calculatedAvatar.value = selectedChat.value.consumer_avatar;
    calculatedFirstName.value = selectedChat.value.consumer_firstName;
  } else {
    calculatedAvatar.value = selectedChat.value.sender_avatar;
    calculatedFirstName.value = selectedChat.value.sender_firstName;
  }
});
</script>

<style lang="scss">
.form-send {
  width: 100%;
  bottom: 0;
}

.send-button {
  cursor: pointer;
}

.form-controls {
  flex-grow: 2;
}
</style>
