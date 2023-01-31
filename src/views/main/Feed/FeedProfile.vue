<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/common/store/user";
import { UserFilled } from "@element-plus/icons-vue";

const userStore = useUserStore();

const user = computed(() => userStore.data);
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-200 p-4 w-[200px]">
    <div class="flex flex-col gap-3 items-center">
      <!-- Avatar -->
      <el-avatar :icon="UserFilled" />

      <div>
        <!-- Fullname -->
        <p class="font-medium">{{ user?.full_name }}</p>
        <!-- Username -->
        <p class="text-sm text-gray-500">@{{ user?.username }}</p>
      </div>
    </div>

    <div class="grid grid-cols-2 mt-6">
      <div class="text-center">
        <!-- Post Count -->
        <p class="font-bold text-lg text-gray-500">0</p>
        <span class="text-xs font-semibold text-gray-400">POST</span>
      </div>
      <div class="text-center">
        <!-- Post Count -->
        <p class="font-bold text-lg text-gray-500">0</p>
        <span class="text-xs font-semibold text-gray-400">REACT</span>
      </div>
    </div>
  </div>
</template>
