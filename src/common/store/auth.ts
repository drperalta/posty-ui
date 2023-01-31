import { defineStore } from "pinia";
import {
  ILoginPayload,
  ILoginResponse,
  ISignupPayload,
} from "../interface/IAuth";
import { useAuthService } from "../service/auth";
import { ref } from "vue";
import { ICommonMutationCallbacks } from "../interface/ICommon";
import { IUser } from "./../interface/IUser";
import { AxiosError } from "axios";

const { loginService, signupService } = useAuthService();

interface AuthState {
  token?: string;
}

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);

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
    loginMutation,
    signupMutation,
    logoutMutation,
  };
});
