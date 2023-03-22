<template>
  <q-header>
    <q-toolbar class="items-center justify-between">
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />

      <div>
        <q-item id="auth-links">
          <q-btn> Войти </q-btn>
        </q-item>

        <div class="q-ml-md">
          <div id="user-button"></div>
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { inject } from "vue";

const toggleLeftDrawer = inject("toggleLeftDrawer");
</script>
