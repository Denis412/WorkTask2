<template>
  <q-list v-for="message in messages" :key="message.id">
    <q-item>
      <q-chat-message
        :text="[message.content]"
        :name="message.senderDisplayName"
        :avatar="message.senderAvatarUrl"
        :sent="userApi.get().id !== message.user_id"
      />
    </q-item>
  </q-list>
</template>

<script setup>
import { inject } from "vue";
import userApi from "src/sdk/user";

const messages = inject("messages");
</script>
