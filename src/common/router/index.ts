import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { useAuthStore } from "../store/auth";
import { ROUTES } from "@/common/constants/routes";
import { computed } from "vue";

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();

  const isMain = computed(
    () => to.matched.filter((i) => i.name === "Main").length > 0
  );

  if (to.name === "Main") return { name: "Feed" };

  if (authStore.token === null && isMain.value) {
    // redirect the user to the login page
    return { name: "Login" };
  }

  if (authStore.token && !isMain.value) {
    // redirect the user to the login page
    return { name: "Main" };
  }
});

export default router;
