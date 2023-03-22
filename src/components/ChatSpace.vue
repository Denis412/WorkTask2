<template>
  <div class="flex column relative">
    <div style="overflow-y: auto; max-height: 600px">
      <MessagesList :messages="currentSessionMessages" />
    </div>

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
import { inject, ref } from "vue";
import MessagesList from "./MessagesList.vue";
import { useMutation } from "@vue/apollo-composable";
import { createMessage } from "../graphql-operations/mutations";

const messages = inject("messages");
const currentSessionMessages = ref([]);

const { mutate: createdMessage } = useMutation(createMessage);

const message = ref("");

const sendMessage = async () => {
  const user = window.Clerk.user;

  const createdTime = new Date();

  const hours = createdTime.getHours();
  const minutes = createdTime.getMinutes();

  const currentMessage = {
    senderId: user.id,
    consumerId: "baba",
    senderDisplayName: user.firstName,
    senderAvatarUrl: user.profileImageUrl,
    content: message.value,
    created_at: `${hours}:${minutes}`,
    chat_id: 12,
  };

  currentSessionMessages.value.push(currentMessage);

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
