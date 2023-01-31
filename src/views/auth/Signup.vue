<script setup lang="ts">
import { ref, toRaw } from "vue";
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElNotification,
  FormInstance,
} from "element-plus";
import { ISignupForm, ISignupPayload } from "@/common/interface/IAuth";
import { useForm } from "@/common/helpers/useForm";
import router from "@/common/router";
import { SignupFormRules } from "@/common/rules/auth";
import { useAuthStore } from "@/common/store/auth";
import { AxiosError } from "axios";
import { parseServerZodErrors } from "@/common/utils/parseServerZodErrors";
import { ROUTES } from "@/common/constants/routes";

const authStore = useAuthStore();

const { form, formRef, formRules } = useForm<ISignupForm>({
  defaultValues: {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  },
  rules: SignupFormRules,
});

const formErrors = ref();

const handleOnSignup = (payload: ISignupPayload) => {
  formErrors.value = undefined;

  authStore.signupMutation(payload, {
    onSuccess(data) {
      ElNotification({
        title: "Success",
        message: `Hi, ${data.first_name} you can now login your account.`,
        type: "success",
      });
      router.push(ROUTES.AUTH.LOGIN);
    },
    onError(error) {
      if (error instanceof AxiosError) {
        const hasErrors = parseServerZodErrors(error.response?.data.errors);

        if (hasErrors) {
          console.log(hasErrors);
          formErrors.value = hasErrors;
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
      handleOnSignup(toRaw(form));
      return;
    }
  });
};

const onSignup = () => {
  router.push({ name: "Login" });
};
</script>

<template>
  <main class="flex justify-center items-center h-screen">
    <div class="w-[400px] p-4 rounded-xl text-center">
      <h1 class="text-3xl font-bold text-center mb-8">Sign in</h1>

      <!-- Form -->
      <ElForm ref="formRef" :model="form" :rules="formRules">
        <div class="grid grid-cols-2 gap-4">
          <!-- First Name -->
          <ElFormItem prop="first_name" :error="formErrors?.first_name">
            <ElInput
              placeholder="First Name"
              v-model="form.first_name"
              size="large"
            />
          </ElFormItem>

          <!-- Last Name -->
          <ElFormItem prop="last_name" :error="formErrors?.last_name">
            <ElInput
              placeholder="Last Name"
              v-model="form.last_name"
              size="large"
            />
          </ElFormItem>
        </div>

        <!-- Email -->
        <ElFormItem prop="email" :error="formErrors?.email">
          <ElInput placeholder="Email" v-model="form.email" size="large" />
        </ElFormItem>

        <!-- Username -->
        <ElFormItem prop="username" :error="formErrors?.username">
          <ElInput
            placeholder="Username"
            v-model="form.username"
            size="large"
          />
        </ElFormItem>

        <!-- Password -->
        <ElFormItem prop="password" :error="formErrors?.password">
          <ElInput
            placeholder="Password"
            v-model="form.password"
            type="password"
            size="large"
            :show-password="true"
          />
        </ElFormItem>

        <!-- Submit Button -->
        <ElFormItem class="mt-6">
          <el-button
            class="w-full"
            type="primary"
            size="large"
            @click="submitForm(formRef)"
          >
            Submit
          </el-button>
        </ElFormItem>
      </ElForm>

      <el-button link size="large" @click="onSignup"
        >Already have an account? Login</el-button
      >
    </div>
  </main>
</template>
