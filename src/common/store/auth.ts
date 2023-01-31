import { defineStore } from "pinia";
import {
  ILoginPayload,
  ILoginResponse,
  ISignupPayload,
} from "../interface/IAuth";
import { useAuthService } from "../service/auth";
import { computed, ref } from "vue";
import { ICommonMutationCallbacks } from "../interface/ICommon";
import { IUser } from "./../interface/IUser";

const { loginService, signupService } = useAuthService();

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);
  const isAuthenticated = computed(() => !!token.value);

  const loginMutation = async (
    payload: ILoginPayload,
    callbacks?: ICommonMutationCallbacks<ILoginResponse>
  ) => {
    try {
      const data = await loginService(payload);
      token.value = data.token;
      localStorage.setItem("token", data.token);

      if (callbacks?.onSuccess) callbacks.onSuccess(data);
    } catch (error) {
      if (callbacks?.onError) callbacks.onError(error);
    }
  };

  const signupMutation = async (
    payload: ISignupPayload,
    callbacks?: ICommonMutationCallbacks<IUser>
  ) => {
    try {
      const data = await signupService(payload);

      if (callbacks?.onSuccess) callbacks.onSuccess(data);
    } catch (error) {
      if (callbacks?.onError) callbacks.onError(error);
    }
  };

  const logoutMutation = async () => {
    token.value = null;
    localStorage.removeItem("token");
  };

  return {
    token,
    isAuthenticated,
    loginMutation,
    signupMutation,
    logoutMutation,
  };
});
