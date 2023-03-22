<template>
  <q-list>
    <UserItem v-for="user in usersList" :key="user.id" :currentUser="user" />
  </q-list>
</template>

<script setup>
import UserItem from "./UserItem.vue";

const { usersList } = defineProps({
  usersList: {
    type: Array,
    default: () => [],
  },
});
</script>
