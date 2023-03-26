<template>
  <q-item
    class="flex items-center justify-between"
    clickable
    @click="showDialogWindow = true"
  >
    <div class="avatar-min-size" style="position: relative">
      <q-img :src="currentUser.avatar_url" style="position: relative" />
      <q-icon class="status_icon" :style="{ 'background-color': status }" />
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

          <q-btn
            flat
            label="Да"
            color="primary"
            v-close-popup
            @click="sendChat"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-item>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useMutation, useSubscription } from "@vue/apollo-composable";
import { createChat } from "../graphql-operations/mutations";
import { getUserById } from "../graphql-operations/subscriptions";
import { useQuasar } from "quasar";
import { useStore } from "vuex";

const store = useStore();

const $q = useQuasar();
const { result: user } = useSubscription(getUserById, {
  id: currentUser.id,
});

const { currentUser } = defineProps({
  currentUser: Object,
});

const showDialogWindow = ref(false);
const currentAuthUser = computed(() => store.getters["chat/GET_CURRENT_USER"]);

const { mutate: creatingChat } = useMutation(createChat);

const status = ref("red");

const setStatus = () => {
  status.value =
    new Date().getTime() - new Date(user?.value?.users[0].last_seen).getTime() >
    15_000
      ? "red"
      : "green";
};

const sendChat = async () => {
  if (!currentAuthUser.value) {
    $q.notify({
      type: "negative",
      position: "top",
      message: "Упс! Надо сначала войти в аккаунт!",
    });
    return;
  }

  if (currentUser.id === currentAuthUser.value.id) {
    $q.notify({
      type: "warning",
      position: "top",
      message: "Нельзя создать чат с самим собой!",
    });
    return;
  }

  try {
    await creatingChat({
      sender_id: currentAuthUser.value.id,
      consumer_id: currentUser.id,
      sender_avatar: currentAuthUser.value.profileImageUrl,
      sender_firstName: currentAuthUser.value.firstName,
      consumer_avatar: currentUser.avatar_url,
      consumer_firstName: currentUser.first_name,
    });
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  setStatus();

  setInterval(setStatus, 1_000);
});
</script>

<style scoped>
.status_icon {
  position: absolute;
  bottom: -5px;
  right: -5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
