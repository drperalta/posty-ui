import { IUser } from "./IUser";

export interface ILoginForm {
  username: string;
  password: string;
}

export type ILoginPayload = ILoginForm;
export interface ILoginResponse {
  token: string;
}

export interface ISignupForm {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
}

export type ISignupPayload = ISignupForm;
export type ISignupResponse = IUser;
