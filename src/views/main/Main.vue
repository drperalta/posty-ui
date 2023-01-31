<script setup lang="ts">
import { ROUTES } from "@/common/constants/routes";
import router from "@/common/router";
import { useAuthStore } from "@/common/store/auth";
import Navbar from "@/components/Navbar.vue";

const authStore = useAuthStore();

const onLogout = () => {
  authStore.logoutMutation();
  router.push(ROUTES.AUTH.LOGIN);
};
</script>

<template>
  <Navbar />
  <el-button @click="onLogout">Logout</el-button>
  <router-view></router-view>
</template>
