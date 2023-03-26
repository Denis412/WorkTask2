<template>
  <div class="flex column relative w-100p">
    <div v-if="!selectedChat" class="flex justify-center items-center">
      <span class="text-h3 text-center">Выберите чат...</span>
    </div>

    <div v-else>
      <ChatHeader
        :title="calculatedFirstName"
        :avatarUrl="calculatedAvatar"
        :selectedChat="selectedChat"
      />

      <div v-if="loading" class="text-center text-h3">
        Загрузка сообщений...
      </div>

      <MessagesList v-else :messages="currentMessages?.chats[0]?.messages" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import MessagesList from "./MessagesList.vue";
import { useSubscription } from "@vue/apollo-composable";
import { useStore } from "vuex";
import { getSavedMessagesInThisChat } from "../graphql-operations/subscriptions";
import ChatHeader from "./ChatHeader.vue";

const store = useStore();

const calculatedAvatar = ref("");
const calculatedFirstName = ref("");

const selectedChat = computed(() => store.getters["chat/GET_CURRENT_CHAT"]);
const currentCallId = ref("");
const currentUser = computed(() => store.getters["chat/GET_CURRENT_USER"]);

const variablesChat = ref({ chat_id: selectedChat?.value?.id });

const { result: currentMessages, loading } = useSubscription(
  getSavedMessagesInThisChat,
  variablesChat
);

watch(selectedChat, async (value) => {
  variablesChat.value.chat_id = value?.id;

  if (currentUser.value.id === selectedChat.value.sender_id) {
    calculatedAvatar.value = selectedChat.value.consumer_avatar;
    calculatedFirstName.value = selectedChat.value.consumer_firstName;
  } else {
    calculatedAvatar.value = selectedChat.value.sender_avatar;
    calculatedFirstName.value = selectedChat.value.sender_firstName;
  }
});

watch(loading, (value) => {
  if (!value) currentCallId.value = currentMessages?.value?.chats[0]?.call_id;
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
</style>
