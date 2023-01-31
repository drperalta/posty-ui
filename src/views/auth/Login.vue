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

const { form, formRef, formRules } = useForm<ILoginForm>({
  defaultValues: {
    password: "",
    username: "",
  },
  rules: LoginFormRules,
});

const authStore = useAuthStore();

const handleOnLogin = (payload: ILoginPayload) => {
  authStore.loginMutation(payload, {
    onSuccess() {
      router.push(ROUTES.MAIN.FEED);
    },
    onError(error) {
      let errMessage = "Something went wrong";

      if (error instanceof AxiosError) {
        errMessage = error.response?.data.message;
      }

      ElNotification({
        title: "Error",
        message: errMessage,
        type: "error",
      });
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
        <ElFormItem prop="username">
          <ElInput
            placeholder="Username"
            v-model="form.username"
            size="large"
          />
        </ElFormItem>

        <!-- Password -->
        <ElFormItem prop="password">
          <ElInput
            placeholder="Password"
            v-model="form.password"
            type="password"
            size="large"
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
