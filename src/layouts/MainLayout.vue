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
import MainHeader from "src/components/MainHeader.vue";
import MainDrawer from "src/components/MainDrawer.vue";
import ChatsList from "src/components/ChatsList.vue";
import UsersList from "src/components/UsersList.vue";
import apolloClient from "../apollo/apollo-client";

import {
  provideApolloClient,
  useQuery,
  useSubscription,
} from "@vue/apollo-composable";
import gql from "graphql-tag";

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

provideApolloClient(apolloClient);

const chats = ref([]);
const messages = ref([]);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};

provide("messages", messages);
provide("toggleLeftDrawer", toggleLeftDrawer);

onMounted(async () => {});
</script>
