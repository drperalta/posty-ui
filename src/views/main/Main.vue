<script setup lang="ts">
import { ROUTES } from "@/common/constants/routes";
import router from "@/common/router";
import { useAuthStore } from "@/common/store/auth";

const authStore = useAuthStore();

const onLogout = () => {
  authStore.logoutMutation();
  router.push(ROUTES.AUTH.LOGIN);
};
</script>

<template>
  <h1>Main</h1>
  <el-button @click="onLogout">Logout</el-button>
  <router-view></router-view>
</template>
