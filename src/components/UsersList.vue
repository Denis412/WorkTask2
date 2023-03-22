<template>
  <UserItem v-for="user in usersList" :key="user.id" />
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
