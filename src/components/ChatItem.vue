<template>
  <q-item
    clickable
    class="flex items-center"
    @click="selectChat(currentChat.id)"
  >
    <div>{{ currentChat.consumer_firstName }}</div>
  </q-item>
</template>

<script setup>
import { inject } from "vue";

const { currentChat } = defineProps({
  currentChat: Object,
});

const selectChat = inject("selectChat");
</script>
