import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { useAuthStore } from "../store/auth";
import { ROUTES } from "@/common/constants/routes";

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();

  if (to.path === "/") {
    return { name: "Feed" };
  }

  if (to.path === ROUTES.MAIN.FEED && authStore.token === null) {
    // redirect the user to the login page
    return { name: "Login" };
  }

  if (
    (authStore.token && to.path === ROUTES.AUTH.LOGIN) ||
    to.path === ROUTES.AUTH.SIGNUP
  ) {
    return { name: "Feed" };
  }
});

export default router;
