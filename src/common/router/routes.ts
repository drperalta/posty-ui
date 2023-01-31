import { RouteRecordRaw } from "vue-router";
import { ROUTES } from "@/common/constants/routes";
import HomePage from "@/views/HomePage.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: ROUTES.HOME,
    name: "home",
    component: HomePage,
  },
];
