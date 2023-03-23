<template>
  <div class="flex column relative">
    <ChatHeader
      :title="currentChat.sender_firstName"
      :avatarUrl="currentChat.sender_avatar"
    />

    <MessagesList :messages="messages" />

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
import { computed, ref, watch } from "vue";
import MessagesList from "./MessagesList.vue";
import { useMutation, useQuery, useSubscription } from "@vue/apollo-composable";
import { createMessage } from "../graphql-operations/mutations";
import { useStore } from "vuex";
import { getSavedMessagesInThisChat } from "../graphql-operations/query";
import ChatHeader from "./ChatHeader.vue";

const store = useStore();

const currentChat = computed(() => store.getters["chat/GET_CURRENT_CHAT"]);
const messages = ref([]);

const {
  result: currentMessages,
  loading,
  refetch,
} = useQuery(getSavedMessagesInThisChat, {
  chat_id: currentChat.value.id,
});

watch(currentChat, async (value) => {
  await refetch({
    chat_id: currentChat.value.id,
  });

  messages.value = [...currentMessages.value?.messages];
});

const { mutate: createdMessage } = useMutation(createMessage);

const message = ref("");

const sendMessage = async () => {
  const user = window.Clerk.user;

  const currentMessage = {
    senderId: user.id,
    consumerId: "bgbg",
    senderDisplayName: user.firstName,
    senderAvatarUrl: user.profileImageUrl,
    content: message.value,
    created_at: Date.now(),
    chat_id: currentChat.value.id,
  };

  console.log(currentMessage);

  messages.value.push(currentMessage);

  message.value = "";

  try {
    const { data } = await createdMessage(currentMessage);

    console.log("mutate data", data);
  } catch (error) {
    console.log(error);
  }
};
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
