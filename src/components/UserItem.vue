<template>
  <q-item
    class="flex items-center justify-between"
    clickable
    @click="showDialogWindow = true"
  >
    <div class="avatar-min-size">
      <q-img :src="currentUser.avatar_url" />
    </div>
    <div>
      <div class="q-ml-md">{{ currentUser.first_name }}</div>
    </div>

    <q-dialog v-model="showDialogWindow" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm"
            >Вы действительно хотите начать новый чат с данным
            пользователем?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Нет" color="primary" v-close-popup />
          <q-btn flat label="Да" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-item>
</template>

<script setup>
import { ref } from "vue";

const { currentUser } = defineProps({
  currentUser: Object,
});

const showDialogWindow = ref(false);

const toggleShowDialogWindow = () => {
  showDialogWindow.value = !showDialogWindow.value;
};
</script>

<style>
.avatar-min-size {
  width: 40px;
  height: 40px;
}
</style>
