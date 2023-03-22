<template>
  <ChatItem v-for="chat in chatsList" :key="chat.id" :currentChat="chat" />
</template>

<script setup>
import ChatItem from "./ChatItem.vue";

const { chatsList } = defineProps({
  chatsList: {
    type: Array,
    default: () => [],
  },
});
</script>
