<template>
  <header
    class="flex items-center justify-between bg-grey-4"
    style="min-height: 4rem"
  >
    <div class="flex items-center">
      <div>
        <q-img class="q-ml-md avatar-min-size" :src="avatarUrl" />
      </div>
      <span class="q-ml-md text-h5">{{ title }}</span>
      <q-icon
        class="q-mx-md text-h5 text-primary cur-pointer"
        name="videocam"
      />
    </div>
    <q-icon
      class="q-mx-md text-h5 text-primary cur-pointer"
      name="arrow_back"
    />
  </header>
</template>

<script setup>
const { title, avatarUrl } = defineProps({
  title: String,
  avatarUrl: String,
});
</script>
