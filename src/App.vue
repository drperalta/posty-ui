<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "./common/store/auth";
import { useUserStore } from "./common/store/user";

const authStore = useAuthStore();
const userStore = useUserStore();

onMounted(() => {
  const token = localStorage.getItem("token");

  if (token) {
    authStore.token = token;

    // Get logged in user details
    userStore.getUserDetails();
  }

  console.log(authStore.token);
});
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
