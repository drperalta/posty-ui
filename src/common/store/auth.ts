import { defineStore } from "pinia";
import { ILoginPayload, ISignupPayload } from "../interface/IAuth";
import { useAuthService } from "../service/auth";
import { ref } from "vue";
import { ICommonMutationCallbacks } from "../interface/ICommon";

const { loginService, signupService } = useAuthService();

interface AuthState {
  token?: string;
}

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);

  const loginMutation = async (
    payload: ILoginPayload,
    callbacks?: ICommonMutationCallbacks
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
    callbacks?: ICommonMutationCallbacks
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
    loginMutation,
    signupMutation,
    logoutMutation,
  };
});
