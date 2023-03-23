<template>
  <q-layout view="hHh LpR lFr">
    <MainHeader />

    <MainDrawer side="left" title="Список чатов" v-model="leftDrawerOpen">
      <template #list>
        <ChatsList :chats-list="chats?.chats" class="q-mt-md" />
      </template>
    </MainDrawer>

    <MainDrawer
      side="right"
      title="Список пользователей"
      v-model="rightDrawerOpen"
    >
      <template #list>
        <UsersList :users-list="users?.users" class="q-mt-md" />
      </template>
    </MainDrawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>

    <q-footer>
      <SendForm
        v-if="selectedChat"
        class="bg-white"
        :selected-chat="selectedChat"
        :variables="variablesSendForm"
      />
    </q-footer>
  </q-layout>
</template>

<script setup>
import { computed, onMounted, provide, ref, watch } from "vue";
import MainHeader from "src/components/MainHeader.vue";
import MainDrawer from "src/components/MainDrawer.vue";
import ChatsList from "src/components/ChatsList.vue";
import UsersList from "src/components/UsersList.vue";
import apolloClient from "../apollo/apollo-client";
import SendForm from "src/components/SendForm.vue";
import { provideApolloClient, useSubscription } from "@vue/apollo-composable";
import { useStore } from "vuex";
import { getUsers } from "../graphql-operations/subscriptions";
import { getAllChatsForCurrentUser } from "../graphql-operations/subscriptions";

provideApolloClient(apolloClient);

const store = useStore();

const user = ref(null);
const variables = ref({ user_id: user?.id });
const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

const selectedChat = computed(() => store.getters["chat/GET_CURRENT_CHAT"]);
const variablesSendForm = ref({ chat_id: selectedChat?.value.id });

const { result: users } = useSubscription(getUsers);
const { result: chats } = useSubscription(getAllChatsForCurrentUser, variables);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};

const selectChat = (id) => {
  store.commit("chat/CHANGE_CHAT", id);
};

provide("user", user);
provide("selectChat", selectChat);
provide("toggleLeftDrawer", toggleLeftDrawer);
provide("toggleRightDrawer", toggleRightDrawer);

watch(user, (value) => {
  variables.value.user_id = value?.id;
});

watch(selectedChat, (value) => {
  variablesSendForm.value.chat_id = value?.id;
});

onMounted(() => {
  const timerIdUser = setInterval(() => {
    user.value = window.Clerk?.user;

    if (user.value) clearInterval(timerIdUser);
  }, 500);
});
</script>
