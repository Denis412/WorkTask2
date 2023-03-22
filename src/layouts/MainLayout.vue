<template>
  <q-layout view="hHh Lpr lFf">
    <MainHeader />

    <MainDrawer side="left" title="Список чатов" v-model="leftDrawerOpen" />
    <MainDrawer
      side="right"
      title="Список пользователей"
      v-model="rightDrawerOpen"
    />

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
import MainHeader from "src/components/MainHeader.vue";
import MainDrawer from "src/components/MainDrawer.vue";

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};

provide("toggleLeftDrawer", toggleLeftDrawer);

onMounted(() => {
  const onMessage = (message) => {
    const user = window.Clerk.user;
  };

  // stompClient.connect("user1", "user1", onConnect, (error) =>
  //   console.log(error)
  // );
});
</script>
