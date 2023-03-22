<template>
  <q-item class="flex items-center justify-end" clickable>
    <div class="flex items-center">
      <!-- <q-img :src="currentUser.avatarUrl" /> -->
      img
      <span class="q-ml-md">{{ currentUser.firstName }}</span>
    </div>
  </q-item>
</template>

<script setup>
const { currentUser } = defineProps({
  currentUser: Object,
});
</script>
