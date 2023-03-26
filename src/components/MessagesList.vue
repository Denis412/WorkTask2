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
import { calculateTime } from "src/utils/calculateTime";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const { messages } = defineProps({
  messages: Array,
});

const currentUser = computed(() => store.getters["chat/GET_CURRENT_USER"]);

const checkSender = (user_id) => currentUser.value?.id === user_id;
</script>

<style scoped>
.list-size {
  max-height: 75vh;
  overflow-y: auto;
}
</style>
