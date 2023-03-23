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
import { inject, ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { createChat } from "../graphql-operations/mutations";
import { useQuasar } from "quasar";

const $q = useQuasar();

const { currentUser } = defineProps({
  currentUser: Object,
});

const showDialogWindow = ref(false);

const { mutate: creatingChat } = useMutation(createChat);

const sendChat = async () => {
  if (!window.Clerk?.user) {
    $q.notify({
      type: "negative",
      position: "top",
      message: "Упс! Надо сначала войти в аккаунт!",
    });
    return;
  }

  const user = window.Clerk?.user;

  if (currentUser.id === user.id) {
    $q.notify({
      type: "warning",
      position: "top",
      message: "Нельзя создать чат с самим собой!",
    });
    return;
  }

  console.log("cur", currentUser);
  console.log("us", user);

  try {
    const { data } = await creatingChat({
      sender_id: user.id,
      consumer_id: currentUser.id,
      sender_avatar: user.profileImageUrl,
      sender_firstName: user.firstName,
      consumer_avatar: currentUser.avatar_url,
      consumer_firstName: currentUser.first_name,
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const toggleShowDialogWindow = () => {
  showDialogWindow.value = !showDialogWindow.value;
};
</script>

<style></style>
