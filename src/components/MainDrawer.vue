<template>
  <q-drawer v-model="leftDrawerOpen" :side="side" show-if-above bordered>
    <q-list>
      <q-item-label header>{{ title }}</q-item-label>
    </q-list>
  </q-drawer>
</template>

<script setup>
const { side, title, list } = defineProps({
  side: String,
  title: String,
  list: Array,
});
</script>
