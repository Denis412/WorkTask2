<template>
  <q-drawer v-model="leftDrawerOpen" :side="side" show-if-above bordered>
    <slot name="list">Список пуст</slot>
  </q-drawer>
</template>

<script setup>
const { side, title, list } = defineProps({
  side: String,
  title: String,
  list: Array,
});
</script>
