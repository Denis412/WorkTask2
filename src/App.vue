<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>

  <q-dialog v-model="showVideoTracks" persistent>
    <q-card style="max-width: 1100px">
      <VideoStream />

      <q-card-actions align="left">
        <q-btn
          flat
          label="Выйти из видео чата"
          color="negative"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { provideApolloClient, useMutation } from "@vue/apollo-composable";
import { onMounted, provide, ref } from "vue";
import { useStore } from "vuex";
import { createUser, updateUserLastSeen } from "./graphql-operations/mutations";
import apolloClient from "./apollo/apollo-client";
import VideoStream from "./components/VideoStream.vue";

provideApolloClient(apolloClient);

const store = useStore();

const showVideoTracks = ref(false);

const { mutate: creatingUser } = useMutation(createUser);
const { mutate: updatinguserLastSeen } = useMutation(updateUserLastSeen);

const updateLastSeen = async (id) => {
  const lastSeen = new Date().toISOString();

  await updatinguserLastSeen({
    user_id: id,
    last_seen: lastSeen,
  });
};

const setToken = async () => {
  sessionStorage.setItem(
    "token",
    await window.Clerk.session?.getToken({ template: "hasura" })
  );
};

const setTrueForShowVideoTrack = () => (showVideoTracks.value = true);

provide("setTrueForShowVideoTrack", setTrueForShowVideoTrack);

const publishableKey =
  "pk_test_c3Ryb25nLWNhbWVsLTQzLmNsZXJrLmFjY291bnRzLmRldiQ";

const startClerk = async () => {
  const Clerk = window.Clerk;

  try {
    await Clerk.load();

    const userButton = document.getElementById("user-button");
    const authLinks = document.getElementById("auth-links");

    Clerk.addListener(
      ({ user }) => (authLinks.style.display = user ? "none" : "block")
    );

    if (Clerk.user) {
      Clerk.mountUserButton(userButton);
      userButton.style.margin = "auto";

      store.commit("chat/SET_CURRENT_USER", Clerk.user);

      setToken();
      const timerSetToken = setInterval(async () => {
        await setToken();

        if (!Clerk.user) clearInterval(timerSetToken);
      }, 1_000);

      try {
        await creatingUser({
          id: Clerk.user.id,
          first_name: Clerk.user.firstName,
          email: Clerk.user.primaryEmailAddress.emailAddress,
          avatar_url: Clerk.user.profileImageUrl,
        });
      } catch (error) {
        console.log(error);
      }

      await updateLastSeen(Clerk.user?.id);

      const timerUpdateLastSeen = setInterval(async () => {
        await updateLastSeen(Clerk.user?.id);

        if (!Clerk.user) clearInterval(timerUpdateLastSeen);
      }, 10_000);
    }
  } catch (err) {
    console.error("Error starting Clerk: ", err);
  }
};

(() => {
  const script = document.createElement("script");
  script.setAttribute("data-clerk-publishable-key", publishableKey);
  script.async = true;
  script.src = `https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js`;
  script.crossOrigin = "anonymous";
  script.addEventListener("load", startClerk);
  script.addEventListener("error", () => {
    document.getElementById("no-frontend-api-warning").hidden = false;
  });
  document.body.appendChild(script);
})();
</script>
