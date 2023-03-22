<template>
  <q-layout view="hHh Lpr lFf">
    <MainHeader />

    <MainDrawer side="left" title="Список чатов" v-model="leftDrawerOpen">
      <template #list>
        <ChatsList :chats-list="chats" class="q-mt-md" />
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
  </q-layout>
</template>

<script setup>
import { computed, onMounted, onUpdated, provide, ref, watch } from "vue";
import MainHeader from "src/components/MainHeader.vue";
import MainDrawer from "src/components/MainDrawer.vue";
import ChatsList from "src/components/ChatsList.vue";
import UsersList from "src/components/UsersList.vue";
import apolloClient from "../apollo/apollo-client";
import {
  provideApolloClient,
  useMutation,
  useQuery,
} from "@vue/apollo-composable";
import { useStore } from "vuex";
import { getUsers } from "../graphql-operations/query";
import { createUser } from "../graphql-operations/mutations";
import { tSBigIntKeyword } from "@babel/types";

provideApolloClient(apolloClient);

const { result: users } = useQuery(getUsers);

const store = useStore();

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

provideApolloClient(apolloClient);

const chats = ref([
  {
    id: 12,
    sender_id: "user_2NNDSNxio14fOwWraMxRaJqKTT5",
    consumer_id: "baba",
    sender_avatar: "ghgh",
    sender_firstName: "Danil",
    consumer_avatar: "ghgh",
    consumer_firstName: "Danil",
  },
  {
    id: 13,
    sender_id: "user_2NNDSNxio14fOwWraMxRaJqKTT5",
    consumer_id: "baba",
    sender_avatar: "ghgh",
    sender_firstName: "Alexey",
    consumer_avatar: "ghgh",
    consumer_firstName: "Alexey",
  },
]);
// const users = ref([
//   {
//     id: 1,
//     avatarUrl: "gg",
//     firstName: "Danil",
//   },
//   {
//     id: 2,
//     avatarUrl: "gg",
//     firstName: "Alexey",
//   },
// ]);
const messages = ref([]);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};

const selectChat = (id) => {
  store.commit("chat/CHANGE_CHAT", id);
};

provide("messages", messages);
provide("selectChat", selectChat);
provide("toggleLeftDrawer", toggleLeftDrawer);
</script>
