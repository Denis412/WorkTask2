<template>
  <div class="flex column relative w-100p">
    <div v-if="!selectedChat" class="flex justify-center items-center">
      <span class="text-h3 text-center">Выберите чат...</span>
    </div>

    <div v-else>
      <ChatHeader :title="calculatedFirstName" :avatarUrl="calculatedAvatar" />

      <div v-if="loading" class="text-center text-h3">
        Загрузка сообщений...
      </div>

      <MessagesList v-else :messages="currentMessages?.messages" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import MessagesList from "./MessagesList.vue";
import { useSubscription, useMutation, useQuery } from "@vue/apollo-composable";
import { useStore } from "vuex";
import { getSavedMessagesInThisChat } from "../graphql-operations/subscriptions";
import { getCurrentIdCalls } from "../graphql-operations/query";
import { createCallInChat } from "src/graphql-operations/mutations";
import ChatHeader from "./ChatHeader.vue";

const store = useStore();

const calculatedAvatar = ref("");
const calculatedFirstName = ref("");

const selectedChat = computed(() => store.getters["chat/GET_CURRENT_CHAT"]);
const currentCallId = computed(() => store.getters["chat/GET_CURRENT_CALL"]);
const currentUser = computed(() => store.getters["chat/GET_CURRENT_USER"]);

const variablesChat = ref({ chat_id: selectedChat?.value.id });

const { mutate: creatingCall } = useMutation(createCallInChat);
const { result: currentMessages, loading } = useSubscription(
  getSavedMessagesInThisChat,
  variablesChat
);
const { result: currentIdCalls, refetch } = useQuery(getCurrentIdCalls, {
  user_id: currentUser.value?.id,
});

watch(currentUser, (value) => {
  refetch({
    user_id: value.id,
  });
});

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

watch(currentCallId, async (value) => {
  if (!value) return;

  let sender,
    consumer = "";

  if (currentUser.value.id === selectedChat.value.sender_id) {
    sender = selectedChat.value.sender_id;
    consumer = selectedChat.value.consumer_id;
  } else {
    sender = selectedChat.value.consumer_id;
    consumer = selectedChat.value.sender_id;
  }

  try {
    const { data } = await creatingCall({
      id: selectedChat.value.id,
      call_id: value,
    });

    console.log(data);
  } catch (error) {
    console.log(error);
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
</style>
