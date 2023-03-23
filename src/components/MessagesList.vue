<template>
  <q-list class="list-size">
    <q-item
      v-for="message in messages"
      :key="message.id"
      :class="{ 'justify-end': checkSender(message.senderId) }"
    >
      <q-chat-message
        :text="[message.content]"
        :name="message.senderDisplayName"
        :avatar="message.senderAvatarUrl"
        :sent="checkSender(message.senderId)"
        :stamp="calculateTime(message.created_at)"
      />
    </q-item>
  </q-list>
</template>

<script setup>
import userApi from "src/sdk/user";
import { calculateTime } from "src/utils/calculateTime";

const { messages } = defineProps({
  messages: Array,
});

const checkSender = (user_id) => userApi.get()?.id === user_id;

const classes = {
  "justify-start": false,
  "justify-end": false,
};
</script>

<style scoped>
.list-size {
  max-height: 75vh;
  overflow-y: auto;
}
</style>
