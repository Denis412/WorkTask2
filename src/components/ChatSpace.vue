<template>
  <div class="flex column relative">
    <div class="messages-area"></div>

    <q-form class="form-send absolute flex items-center">
      <div class="form-controls q-ml-md">
        <q-input
          type="text"
          v-model="message"
          placeholder="Ваше сообщение..."
        />
      </div>

      <div class="form-buttons q-mx-md">
        <q-icon class="send-button text-h5 text-primary" name="send" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import MessagesList from "./MessagesList.vue";

const messages = inject("messages");
const currentSessionMessages = ref([]);

const message = ref("");
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
