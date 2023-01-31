<script setup lang="ts">
import { computed, ref } from "vue";
import { useAuthStore } from "@/common/store/auth";
import { UserFilled } from "@element-plus/icons-vue";
import router from "@/common/router";
import { ROUTES } from "@/common/constants/routes";
import Logo from "@/assets/posty-logo.svg";
import { useUserStore } from "@/common/store/user";

const authStore = useAuthStore();
const userStore = useUserStore();

const isSearch = ref<boolean>(false);

const user = computed(() => userStore.data);

const handleOnLogout = () => {
  authStore.logoutMutation();
  router.push(ROUTES.AUTH.LOGIN);
};
</script>

<template>
  <nav class="h-[60px] border-b border-gray-300 px-2">
    <!-- Wrapper -->
    <div
      class="max-w-4xl mx-auto flex gap-4 items-center justify-between h-full"
    >
      <!-- Logo -->
      <div class="w-9 h-auto">
        <img :src="Logo" alt="posty-logo" />
      </div>

      <!-- Search Input  -->
      <ElInput placeholder="Search" v-if="isSearch" />

      <!-- Profile -->
      <div>
        <el-dropdown>
          <div
            class="flex items-center py-2 px-4 gap-2 hover:bg-gray-50 rounded-xl transition-all"
          >
            <p class="font-medium">{{ user?.full_name }}</p>
            <el-avatar :icon="UserFilled" size="small" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Profile</el-dropdown-item>
              <el-dropdown-item divided @click="handleOnLogout"
                >Logout</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </nav>
</template>
