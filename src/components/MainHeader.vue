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

      <div class="flex items-center">
        <q-item id="auth-links">
          <q-btn @click="userApi.login"> Войти </q-btn>
        </q-item>

        <div class="q-ml-md">
          <div id="user-button"></div>
        </div>
        <q-btn
          class="burger_btn"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleRightDrawer"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { inject } from "vue";
import userApi from "../sdk/user";

const toggleLeftDrawer = inject("toggleLeftDrawer");
const toggleRightDrawer = inject("toggleRightDrawer");
</script>

<style>
.burger_btn {
  display: none;
}

@media (max-width: 1006px) {
  .burger_btn {
    display: flex;
  }
}
</style>
