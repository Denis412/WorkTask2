<template>
  <div class="flex column relative">
    <ChatHeader title="Danil" avatarUrl="ava" />

    <MessagesList :messages="currentMessages?.messages" />

    <q-form class="form-send absolute flex items-center">
      <div class="form-controls q-ml-md">
        <q-input
          type="text"
          v-model="message"
          placeholder="Ваше сообщение..."
        />
      </div>

      <div class="form-buttons q-mx-md">
        <q-icon
          class="send-button text-h5 text-primary"
          name="send"
          @click="sendMessage"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { computed, inject, ref, watch } from "vue";
import MessagesList from "./MessagesList.vue";
import { useMutation, useQuery, useSubscription } from "@vue/apollo-composable";
import { createMessage } from "../graphql-operations/mutations";
import { useStore } from "vuex";
import { getSavedMessagesInThisChat } from "../graphql-operations/query";
import ChatHeader from "./ChatHeader.vue";

const store = useStore();

const currentChat = computed(() => store.getters["chat/GET_CURRENT_CHAT"]);

const {
  result: currentMessages,
  loading,
  refetch,
} = useQuery(getSavedMessagesInThisChat, {
  chat_id: currentChat.value,
});

watch(currentChat, (value) => {
  refetch({
    chat_id: currentChat.value,
  });
});

const { mutate: createdMessage } = useMutation(createMessage);

const message = ref("");

const sendMessage = async () => {
  const user = window.Clerk.user;

  const currentMessage = {
    senderId: user.id,
    consumerId: "baba",
    senderDisplayName: user.firstName,
    senderAvatarUrl: user.profileImageUrl,
    content: message.value,
    created_at: Date.now(),
    chat_id: 12,
  };

  currentMessages.value?.messages.push(currentMessage);

  message.value = "";

  try {
    const { data } = await createdMessage(currentMessage);

    console.log("mutate data", data);
  } catch (error) {
    console.log(error);
  }
};

watch(
  () => currentChat,
  (oldVal, newVal) => {
    subscribeToMore(
      getSavedMessagesInThisChat,
      {
        newVal,
      },
      (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageAdded;
        return {
          messages: [...prev.messages, newMessage],
        };
      }
    );
  }
);
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
