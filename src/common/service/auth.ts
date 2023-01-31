import { ENDPOINTS } from "../constants/endpoints";
import {
  ILoginPayload,
  ILoginResponse,
  ISignupPayload,
  ISignupResponse,
} from "../interface/IAuth";
import { axios } from "../utils/axios";

export const useAuthService = () => {
  /**
   * Login user
   * @param payload user credentials
   * @returns access token
   */
  const loginService = async (
    payload?: ILoginPayload
  ): Promise<ILoginResponse> => {
    const response = await axios.post(ENDPOINTS.AUTH.LOGIN, payload);

    return response.data;
  };

  /**
   * Sign up user
   * @param payload user details
   * @returns created user details
   */
  const signupService = async (
    payload?: ISignupPayload
  ): Promise<ISignupResponse> => {
    const response = await axios.post(ENDPOINTS.AUTH.SIGNUP, payload);

    return response.data;
  };

  return {
    loginService,
    signupService,
  };
};
