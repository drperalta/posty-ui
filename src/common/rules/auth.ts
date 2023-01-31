import { ILoginForm, ISignupForm } from "../interface/IAuth";
import { FormRules } from "../interface/IForm";

export const LoginFormRules: FormRules<ILoginForm> = {
  username: {
    required: true,
  },
  password: {
    required: true,
    min: 6,
    max: 32,
  },
};

export const SignupFormRules: FormRules<ISignupForm> = {
  first_name: {
    required: true,
  },
  last_name: {
    required: true,
  },
  email: {
    type: "email",
    required: true,
  },
  username: {
    required: true,
  },
  password: {
    required: true,
    min: 6,
    max: 32,
  },
};
