<template>
  <q-form class="form-send absolute flex items-center">
    <div class="form-controls q-ml-md">
      <q-input type="text" v-model="message" placeholder="Ваше сообщение..." />
    </div>

    <div class="form-buttons q-mx-md">
      <q-icon
        class="send-button text-h5 text-primary"
        name="send"
        @click="sendMessage"
      />
    </div>
  </q-form>
</template>

<script setup>
import { useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
import { createMessage } from "../graphql-operations/mutations";

const { selectedChat, messagePush, variables } = defineProps({
  selectedChat: Object,
  variables: Object,
  messagePush: Function,
});

const { mutate: createdMessage } = useMutation(createMessage);

const message = ref("");

const sendMessage = async () => {
  const user = window.Clerk.user;

  const currentConsumerId =
    user.id === selectedChat.sender_id
      ? selectedChat.consumer_id
      : selectedChat.sender_id;

  console.log(variables.chat_id);

  const currentMessage = {
    senderId: user.id,
    consumerId: currentConsumerId,
    senderDisplayName: user.firstName,
    senderAvatarUrl: user.profileImageUrl,
    content: message.value,
    created_at: Date.now(),
    chat_id: variables.chat_id,
  };

  message.value = "";

  try {
    await createdMessage(currentMessage);
  } catch (error) {
    console.log(error);
  }
};
</script>
