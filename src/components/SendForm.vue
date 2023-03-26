<template>
  <q-form class="flex items-center">
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
import { computed, ref } from "vue";
import { createMessage } from "../graphql-operations/mutations";
import { useStore } from "vuex";

const store = useStore();

const { selectedChat, messagePush, variables } = defineProps({
  selectedChat: Object,
  variables: Object,
  messagePush: Function,
});

const currentUser = computed(() => store.getters["chat/GET_CURRENT_USER"]);

const { mutate: createdMessage } = useMutation(createMessage);

const message = ref("");

const sendMessage = async () => {
  const currentConsumerId =
    currentUser.value.id === selectedChat.sender_id
      ? selectedChat.consumer_id
      : selectedChat.sender_id;

  const currentMessage = {
    senderId: currentUser.value.id,
    consumerId: currentConsumerId,
    senderDisplayName: currentUser.value.firstName,
    senderAvatarUrl: currentUser.value.profileImageUrl,
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

<style scoped>
.form-controls {
  flex-grow: 2;
}
</style>
