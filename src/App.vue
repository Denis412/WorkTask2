<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(async () => {
  sessionStorage.setItem(
    "token",
    await window.Clerk.session?.getToken({ template: "hasura" })
  );

  setInterval(
    async () =>
      sessionStorage.setItem(
        "token",
        await window.Clerk.session?.getToken({ template: "hasura" })
      ),
    1_000
  );
});
</script>
