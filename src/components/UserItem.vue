<template>
  <q-item class="flex items-center justify-end" clickable>
    <div class="avatar-min-size">
      <q-img :src="currentUser.avatar_url" />
    </div>
    <div>
      <div class="q-ml-md">{{ currentUser.first_name }}</div>
    </div>
  </q-item>
</template>

<script setup>
const { currentUser } = defineProps({
  currentUser: Object,
});
</script>

<style>
.avatar-min-size {
  width: 40px;
  height: 40px;
}
</style>
