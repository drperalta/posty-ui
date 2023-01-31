import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  routes,
  history: createWebHistory(),
});

// router.beforeEach(async (to, from) => {
//   if (to.path === "/") {
//     // redirect the user to the login page
//     return { name: "Login" };
//   }
// });

export default router;
