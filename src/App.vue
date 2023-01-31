<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "./common/store/auth";

const authStore = useAuthStore();

onMounted(() => {
  const token = localStorage.getItem("token");

  if (token) {
    authStore.token = token;
  }

  console.log(authStore.token);
});
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
