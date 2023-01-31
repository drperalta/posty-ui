<script setup lang="ts">
import { toRaw } from "vue";
import { ElNotification, FormInstance } from "element-plus";
import { ILoginForm, ILoginPayload } from "@/common/interface/IAuth";
import { useForm } from "@/common/helpers/useForm";
import { LoginFormRules } from "@/common/rules/auth";
import router from "@/common/router";
import { useAuthStore } from "@/common/store/auth";
import { AxiosError } from "axios";
import { ROUTES } from "@/common/constants/routes";
import { parseServerZodErrors } from "@/common/utils/parseServerZodErrors";
import { useUserStore } from "@/common/store/user";

const { form, formRef, formRules, errors, setErrors } = useForm<ILoginForm>({
  defaultValues: {
    password: "",
    username: "",
  },
  rules: LoginFormRules,
});

const authStore = useAuthStore();
const userStore = useUserStore();

const handleOnLogin = (payload: ILoginPayload) => {
  setErrors(undefined);

  authStore.loginMutation(payload, {
    onSuccess() {
      userStore.getUserDetails();
      router.push(ROUTES.MAIN.FEED);
    },
    onError(error) {
      if (error instanceof AxiosError) {
        const hasErrors = parseServerZodErrors<ILoginForm>(
          error.response?.data.errors
        );

        if (hasErrors) {
          console.log(hasErrors);
          setErrors(hasErrors);
          return;
        }

        ElNotification({
          title: "Error",
          message:
            error.response?.data.message ||
            error?.message ||
            "Something went wrong",
          type: "error",
        });
      }
    },
  });
};

const submitForm = async (formInstance?: FormInstance) => {
  if (!formInstance) return;

  await formInstance.validate((valid, errorFields) => {
    if (valid) {
      handleOnLogin(toRaw(form));
      return;
    }
  });
};

const onSignup = () => {
  router.push({ name: "Signup" });
};
</script>

<template>
  <main class="flex justify-center items-center h-screen">
    <div class="w-[360px] p-2 rounded-xl text-center">
      <h1 class="text-3xl font-bold text-center mb-8">Login</h1>

      <!-- Form -->
      <ElForm ref="formRef" :model="form" :rules="formRules">
        <!-- Username -->
        <ElFormItem prop="username" :error="errors?.username">
          <ElInput
            placeholder="Username"
            v-model="form.username"
            size="large"
          />
        </ElFormItem>

        <!-- Password -->
        <ElFormItem prop="password" :error="errors?.password">
          <ElInput
            placeholder="Password"
            v-model="form.password"
            type="password"
            size="large"
            show-password
          />
        </ElFormItem>

        <ElFormItem class="mt-6">
          <ElButton
            class="w-full"
            type="primary"
            size="large"
            @click="submitForm(formRef)"
          >
            Login
          </ElButton>
        </ElFormItem>
      </ElForm>

      <ElButton link size="large" @click="onSignup"
        >Don't have an account? Sign up</ElButton
      >
    </div>
  </main>
</template>
