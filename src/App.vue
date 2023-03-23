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
import { onMounted, provide, ref, watch } from "vue";
import { createUser } from "./graphql-operations/mutations";
import apolloClient from "./apollo/apollo-client";
import VideoStream from "./components/VideoStream.vue";

provideApolloClient(apolloClient);

const { mutate: creatingUser } = useMutation(createUser);

const showVideoTracks = ref(false);

const setTrueForShowVideoTrack = () => (showVideoTracks.value = true);

provide("setTrueForShowVideoTrack", setTrueForShowVideoTrack);

const publishableKey =
  "pk_test_c3Ryb25nLWNhbWVsLTQzLmNsZXJrLmFjY291bnRzLmRldiQ"; // <- Add Publishable Key here

const startClerk = async () => {
  const Clerk = window.Clerk;

  try {
    // Load Clerk environment and session if available
    await Clerk.load();

    const userButton = document.getElementById("user-button");
    const authLinks = document.getElementById("auth-links");

    Clerk.addListener(({ user }) => {
      // Display links conditionally based on user state
      authLinks.style.display = user ? "none" : "block";
    });

    if (Clerk.user) {
      // Mount user button component
      Clerk.mountUserButton(userButton);
      userButton.style.margin = "auto";

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

      const { data } = await creatingUser({
        id: Clerk.user.id,
        first_name: Clerk.user.firstName,
        email: Clerk.user.primaryEmailAddress.emailAddress,
        avatar_url: Clerk.user.profileImageUrl,
      });
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

onMounted(async () => {});
</script>
