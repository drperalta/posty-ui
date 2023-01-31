import { RouteRecordRaw } from "vue-router";
import { ROUTES } from "@/common/constants/routes";
import { LoginPage, SignupPage } from "@/views/auth";

export const routes: RouteRecordRaw[] = [
  {
    path: ROUTES.AUTH.LOGIN,
    name: "Login",
    component: LoginPage,
  },
  {
    path: ROUTES.AUTH.SIGNUP,
    name: "Signup",
    component: SignupPage,
  },
];
