<template>
  <q-layout view="hHh Lpr lFf">
    <MainHeader />

    <MainDrawer side="left" title="Список чатов" v-model="leftDrawerOpen">
      <template #list>
        <ChatsList />
      </template>
    </MainDrawer>

    <MainDrawer
      side="right"
      title="Список пользователей"
      v-model="rightDrawerOpen"
    >
      <template #list>
        <UsersList />
      </template>
    </MainDrawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, provide, ref } from "vue";
import stompClient from "../lib/stompClient";
import clerk from "@clerk/clerk-sdk-node";
import Clerk from "@clerk/clerk-sdk-node/esm/instance";
import MainHeader from "src/components/MainHeader.vue";
import MainDrawer from "src/components/MainDrawer.vue";
import ChatsList from "src/components/ChatsList.vue";
import UsersList from "src/components/UsersList.vue";

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

const messages = ref([]);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};

provide("toggleLeftDrawer", toggleLeftDrawer);

onMounted(async () => {
  const onMessage = (message) => {
    const user = window.Clerk.user;

    if (message.headers.to === user.id) {
      messages.value.push(JSON.parse(message.body));
    }
  };

  const onConnect = () => {
    stompClient.subscribe("/queue/chat", onMessage);
  };

  stompClient.connect("user1", "user1", onConnect, (error) =>
    console.log(error)
  );
});
</script>
