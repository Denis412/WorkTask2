<template>
  <q-drawer :side="side" show-if-above bordered>
    <div class="text-h5 text-center">{{ title }}</div>
    <slot name="list">Список пуст</slot>
  </q-drawer>
</template>

<script setup>
const { side, title } = defineProps({
  side: String,
  title: String,
});
</script>
