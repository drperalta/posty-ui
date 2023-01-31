import { RouteRecordRaw } from "vue-router";
import { ROUTES } from "@/common/constants/routes";
import { Auth } from "@/views";

const { LoginPage, SignupPage } = Auth;

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
