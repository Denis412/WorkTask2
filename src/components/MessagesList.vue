<template>
  <q-list style="overflow-y: auto; max-height: 550px">
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

const { messages } = defineProps({
  messages: Array,
});

const checkSender = (user_id) => userApi.get()?.id === user_id;

const calculateTime = (created_at) => {
  const createdDate = new Date(created_at);

  const createdHours = createdDate.getHours();
  const createdMinutes = createdDate.getMinutes();

  const stringHours = createdHours > 9 ? createdHours : `0${createdHours}`;
  const stringMinutes =
    createdMinutes > 9 ? createdMinutes : `0${createdMinutes}`;

  return `${stringHours}:${stringMinutes}`;
};

const classes = {
  "justify-start": false,
  "justify-end": false,
};
</script>
