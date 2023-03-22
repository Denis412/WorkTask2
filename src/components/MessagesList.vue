<template>
  <q-list v-for="message in messages" :key="message.id">
    <q-item :class="{ 'justify-end': checkSender }">
      <q-chat-message
        :text="[message.content]"
        :name="message.senderDisplayName"
        :avatar="message.senderAvatarUrl"
        :sent="checkSender(message.senderId)"
        :stamp="message.created_at"
      />
    </q-item>
  </q-list>
</template>

<script setup>
import { ref } from "vue";
import userApi from "src/sdk/user";

const { messages } = defineProps({
  messages: Array,
});

const checkSender = (user_id) => userApi.get().id === user_id;

const classes = {
  "justify-start": false,
  "justify-end": false,
};
</script>
